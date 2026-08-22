from app.modules.users.repository import UserRepository
from app.shared.utils import generate_id
from datetime import datetime, timezone
from app.core.firebase import get_db


class UserService:
    @staticmethod
    def create_user(uid: str, email: str, username: str, display_name: str) -> dict:
        db = get_db()
        user_data = {
            "uid": uid,
            "email": email,
            "username": username,
            "display_name": display_name,
            "role": "user",
            "is_suspended": False,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat(),
            "last_active_at": datetime.now(timezone.utc).isoformat(),
            "followers_count": 0,
            "following_count": 0,
            "posts_count": 0,
        }
        db.collection("users").document(uid).set(user_data)
        return user_data

    @staticmethod
    def get_user(uid: str) -> dict | None:
        return UserRepository.get_by_username(uid)

    @staticmethod
    def update_user(uid: str, updates: dict) -> dict:
        return UserRepository.update(uid, updates)
