from app.modules.admin.repository import AdminRepository
from datetime import datetime, timezone


class AdminService:
    @staticmethod
    def get_dashboard_stats() -> dict:
        return AdminRepository.get_dashboard_stats()

    @staticmethod
    def list_users(query: str = "") -> list[dict]:
        return AdminRepository.list_users(query)

    @staticmethod
    def get_user(user_id: str) -> dict | None:
        return AdminRepository.get_user(user_id)

    @staticmethod
    def update_user(user_id: str, updates: dict) -> dict:
        return AdminRepository.update_user(user_id, updates)

    @staticmethod
    def suspend_user(user_id: str):
        AdminRepository.suspend_user(user_id)

    @staticmethod
    def restore_user(user_id: str):
        AdminRepository.restore_user(user_id)

    @staticmethod
    def list_posts() -> list[dict]:
        return AdminRepository.list_posts()

    @staticmethod
    def delete_post(post_id: str):
        AdminRepository.delete_post(post_id)

    @staticmethod
    def list_comments() -> list[dict]:
        return AdminRepository.list_comments()

    @staticmethod
    def delete_comment(comment_id: str):
        AdminRepository.delete_comment(comment_id)

    @staticmethod
    def list_audit_logs() -> list[dict]:
        return AdminRepository.list_audit_logs()
