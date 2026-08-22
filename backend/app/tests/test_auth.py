import pytest
from fastapi import status
from app.core.security import verify_firebase_token, create_access_token
from app.modules.auth.schemas import TokenResponse, UserSync
from app.modules.auth.exceptions import InvalidTokenError, UserNotFoundError
from app.shared.enums import UserRole


class TestSecurity:
    def test_create_access_token(self):
        data = {"sub": "user-123", "role": "user"}
        token = create_access_token(data)
        assert isinstance(token, str)
        assert len(token) > 0

    def test_verify_firebase_token_invalid(self):
        with pytest.raises(ValueError, match="Invalid token"):
            verify_firebase_token("invalid-token")


class TestAuthSchemas:
    def test_token_response(self):
        resp = TokenResponse(access_token="abc", token_type="bearer")
        assert resp.access_token == "abc"
        assert resp.token_type == "bearer"
        assert resp.model_dump() == {"access_token": "abc", "token_type": "bearer"}

    def test_user_sync(self):
        user = UserSync(uid="uid-1", email="a@b.com", display_name="Name")
        assert user.uid == "uid-1"
        assert user.photo_url is None

    def test_user_sync_with_photo(self):
        user = UserSync(uid="uid-1", email="a@b.com", display_name="Name", photo_url="http://x")
        assert user.photo_url == "http://x"


class TestAuthExceptions:
    def test_invalid_token_error(self):
        exc = InvalidTokenError()
        assert exc.error_code == "INVALID_TOKEN"
        assert exc.status_code == status.HTTP_401_UNAUTHORIZED

    def test_user_not_found_error(self):
        exc = UserNotFoundError()
        assert exc.error_code == "USER_NOT_FOUND"
        assert exc.status_code == status.HTTP_404_NOT_FOUND


class TestHealthEndpoints:
    def test_health(self, client):
        resp = client.get("/health")
        assert resp.status_code == status.HTTP_200_OK
        assert resp.json() == {"status": "ok"}

    def test_readiness(self, client):
        resp = client.get("/health/ready")
        assert resp.status_code == status.HTTP_200_OK
        assert resp.json() == {"status": "ready"}


class TestDemoFeedEndpoint:
    def test_demo_feed(self, client):
        resp = client.get("/api/v1/feed")
        assert resp.status_code == status.HTTP_200_OK
        data = resp.json()
        assert "data" in data
        assert "pagination" in data

    def test_demo_feed_pagination(self, client):
        resp = client.get("/api/v1/feed")
        data = resp.json()
        assert data["pagination"]["next_cursor"] is None
        assert data["pagination"]["has_next"] is False


class TestDemoChatEndpoint:
    def test_demo_chat_empty_message(self, client):
        resp = client.post("/api/v1/ai/chat", json={})
        assert resp.status_code == status.HTTP_200_OK
        data = resp.json()
        assert "data" in data
        assert data["data"]["role"] == "assistant"

    def test_demo_chat_with_message(self, client):
        resp = client.post("/api/v1/ai/chat", json={"message": "Hello"})
        assert resp.status_code == status.HTTP_200_OK
        data = resp.json()
        assert "Hello" in data["data"]["content"]

    def test_demo_chat_missing_message_field(self, client):
        resp = client.post("/api/v1/ai/chat", json={"message": ""})
        assert resp.status_code == status.HTTP_200_OK
        data = resp.json()
        assert "..." in data["data"]["content"]
