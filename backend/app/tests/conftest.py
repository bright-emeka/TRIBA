import os
import sys
import pytest
import pytest_asyncio
from unittest.mock import MagicMock, AsyncMock
from typing import Dict, Any
from fastapi.testclient import TestClient
import httpx

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", ".."))

from app.main import app as fastapi_app


TEST_USER_UID = "test-user-uid-123"
TEST_USER_EMAIL = "test@triba.app"
TEST_USER_USERNAME = "testuser"
TEST_USER_DISPLAY_NAME = "Test User"


@pytest.fixture
def test_user_data() -> Dict[str, Any]:
    return {
        "uid": TEST_USER_UID,
        "email": TEST_USER_EMAIL,
        "username": TEST_USER_USERNAME,
        "display_name": TEST_USER_DISPLAY_NAME,
        "role": "user",
        "is_suspended": False,
        "created_at": "2025-01-01T00:00:00",
        "updated_at": "2025-01-01T00:00:00",
    }


@pytest.fixture
def mock_firebase_app():
    app = MagicMock()
    app.name = "test-app"
    return app


@pytest.fixture
def mock_firestore_client():
    db = MagicMock()
    db.collection.return_value.document.return_value.get.return_value.exists = True
    db.collection.return_value.document.return_value.get.return_value.to_dict.return_value = {}
    return db


@pytest.fixture
def mock_auth():
    auth = MagicMock()
    decoded_token = {
        "uid": TEST_USER_UID,
        "email": TEST_USER_EMAIL,
        "name": TEST_USER_DISPLAY_NAME,
    }
    auth.verify_id_token.return_value = decoded_token
    return auth


@pytest.fixture
def mock_firebase_admin(mock_firebase_app, mock_firestore_client, mock_auth):
    import firebase_admin
    from unittest.mock import patch

    with patch.object(firebase_admin, "_apps", {}), \
         patch.object(firebase_admin, "initialize_app", return_value=mock_firebase_app), \
         patch.object(firebase_admin, "auth", mock_auth), \
         patch("app.core.firebase.firestore") as mock_firestore_mod, \
         patch("app.core.firebase.storage") as mock_storage_mod:

        mock_firestore_mod.client.return_value = mock_firestore_client
        mock_storage_mod.bucket.return_value = MagicMock()
        yield {
            "app": mock_firebase_app,
            "db": mock_firestore_client,
            "auth": mock_auth,
        }


@pytest.fixture
def mock_current_user(test_user_data):
    return test_user_data


@pytest.fixture
def mock_admin_user(test_user_data):
    admin_data = test_user_data.copy()
    admin_data["role"] = "admin"
    return admin_data


@pytest_asyncio.fixture
async def async_client():
    async with httpx.AsyncClient(app=fastapi_app, base_url="http://test") as client:
        yield client


@pytest.fixture
def client():
    return TestClient(fastapi_app)


@pytest.fixture
def auth_headers():
    token = "Bearer test-token-123"
    return {"Authorization": token}


@pytest.fixture
def admin_auth_headers():
    token = "Bearer admin-token-123"
    return {"Authorization": token}
