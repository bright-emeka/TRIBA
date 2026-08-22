from app.modules.notifications.repository import NotificationRepository
from datetime import datetime, timezone


class NotificationService:
    @staticmethod
    def create_notification(recipient_id: str, actor_id: str, notification_type: str, post_id: str | None = None, comment_id: str | None = None) -> dict:
        data = {
            "recipient_id": recipient_id,
            "actor_id": actor_id,
            "type": notification_type,
            "post_id": post_id,
            "comment_id": comment_id,
        }
        return NotificationRepository.create(data)

    @staticmethod
    def get_notifications(user_id: str) -> list[dict]:
        return NotificationRepository.get_for_user(user_id)

    @staticmethod
    def mark_read(notification_id: str):
        NotificationRepository.mark_read(notification_id)

    @staticmethod
    def mark_all_read(user_id: str):
        NotificationRepository.mark_all_read(user_id)
