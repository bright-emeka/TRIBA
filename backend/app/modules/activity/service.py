from app.modules.activity.repository import ActivityRepository
from datetime import datetime, timezone


class ActivityService:
    @staticmethod
    def record(user_id: str, event_type: str, target_type: str | None = None, target_id: str | None = None, metadata: dict | None = None):
        return ActivityRepository.record(user_id, event_type, target_type, target_id, metadata)

    @staticmethod
    def get_user_activity(user_id: str, limit: int = 50) -> list[dict]:
        return ActivityRepository.get_user_activity(user_id, limit)

    @staticmethod
    def get_summary(user_id: str) -> dict:
        events = ActivityService.get_user_activity(user_id, 100)
        return {
            "total_events": len(events),
            "posts_created": sum(1 for e in events if e.get("event_type") == "POST_CREATED"),
            "likes_given": sum(1 for e in events if e.get("event_type") == "LIKE_ADDED"),
            "comments_given": sum(1 for e in events if e.get("event_type") == "COMMENT_CREATED"),
            "follows": sum(1 for e in events if e.get("event_type") == "FOLLOW_ADDED"),
        }
