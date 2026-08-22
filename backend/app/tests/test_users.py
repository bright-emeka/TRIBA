import pytest
from datetime import datetime
from pydantic import ValidationError
from fastapi import status
from app.modules.users.schemas import UserBase, UserCreate, UserUpdate
from app.modules.users.models import UserModel
from app.modules.users.exceptions import (
    UserAlreadyExistsError,
    InvalidUsernameError,
    SuspendedUserError,
    UserNotFoundError,
)
from app.shared.enums import UserRole
from app.shared.utils import is_valid_username, is_valid_email


class TestUserSchemas:
    def test_user_base_defaults(self):
        user = UserBase(
            uid="uid-1",
            email="user@example.com",
            username="johndoe",
            display_name="John Doe",
        )
        assert user.role == UserRole.USER
        assert user.is_suspended is False
        assert user.created_at is None

    def test_user_base_admin_role(self):
        user = UserBase(
            uid="uid-2",
            email="admin@example.com",
            username="admin",
            display_name="Admin",
            role=UserRole.ADMIN,
        )
        assert user.role == UserRole.ADMIN

    def test_user_base_invalid_email(self):
        with pytest.raises(ValidationError):
            UserBase(uid="uid-1", email="not-an-email", username="john", display_name="John")

    def test_user_create(self):
        data = UserCreate(uid="uid-1", email="a@b.com", username="john", display_name="John")
        assert data.uid == "uid-1"
        assert data.model_dump()["email"] == "a@b.com"

    def test_user_update_partial(self):
        update = UserUpdate(display_name="Jane")
        assert update.email is None
        assert update.username is None
        assert update.display_name == "Jane"

    def test_user_update_role(self):
        update = UserUpdate(role=UserRole.ADMIN)
        assert update.role == UserRole.ADMIN

    def test_user_update_suspended(self):
        update = UserUpdate(is_suspended=True)
        assert update.is_suspended is True


class TestUserModel:
    def test_collection_name(self):
        assert UserModel.COLLECTION == "users"

    def test_to_dict(self):
        data = {"email": "a@b.com", "username": "john"}
        assert UserModel.to_dict(data) == data

    def test_from_dict(self):
        data = {"email": "a@b.com", "username": "john"}
        result = UserModel.from_dict(data, "doc-123")
        assert result["uid"] == "doc-123"
        assert result["email"] == "a@b.com"


class TestUserUtils:
    def test_valid_username(self):
        assert is_valid_username("john_doe") is True
        assert is_valid_username("john123") is True

    def test_invalid_username_short(self):
        assert is_valid_username("ab") is False

    def test_invalid_username_long(self):
        assert is_valid_username("a" * 31) is False

    def test_invalid_username_special_chars(self):
        assert is_valid_username("john@doe") is False
        assert is_valid_username("john doe") is False

    def test_valid_email(self):
        assert is_valid_email("user@example.com") is True
        assert is_valid_email("admin@mail.co.uk") is True

    def test_invalid_email(self):
        assert is_valid_email("not-an-email") is False
        assert is_valid_email("@example.com") is False


class TestUserExceptions:
    def test_user_already_exists(self):
        exc = UserAlreadyExistsError()
        assert exc.error_code == "USER_ALREADY_EXISTS"
        assert exc.status_code == status.HTTP_409_CONFLICT

    def test_invalid_username_error(self):
        exc = InvalidUsernameError()
        assert exc.error_code == "INVALID_USERNAME"
        assert exc.status_code == status.HTTP_400_BAD_REQUEST

    def test_suspended_user_error(self):
        exc = SuspendedUserError()
        assert exc.error_code == "SUSPENDED_USER"
        assert exc.status_code == status.HTTP_403_FORBIDDEN

    def test_user_not_found_error(self):
        exc = UserNotFoundError()
        assert exc.error_code == "USER_NOT_FOUND"
        assert exc.status_code == status.HTTP_404_NOT_FOUND


class TestUserCRUD:
    def test_user_create_schema_validation(self):
        data = UserCreate(uid="new-uid", email="new@example.com", username="newuser", display_name="New User")
        assert data.username == "newuser"

    def test_user_update_no_fields(self):
        update = UserUpdate()
        assert update.model_dump(exclude_none=True) == {}

    def test_user_update_multiple_fields(self):
        update = UserUpdate(email="new@example.com", username="newuser", display_name="New Name")
        payload = update.model_dump(exclude_none=True)
        assert payload["email"] == "new@example.com"
        assert payload["username"] == "newuser"
        assert payload["display_name"] == "New Name"


class TestUserSearch:
    def test_username_query_building(self):
        query = "john"
        start_at = query
        end_at = query + "\uf8ff"
        assert start_at == "john"
        assert end_at == "john\uf8ff"
