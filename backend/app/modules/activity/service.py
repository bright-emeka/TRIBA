from datetime import datetime, timezone
from app.core.firebase import get_db


class ActivityService:
    @staticmethod
    def record(user_id: str, event_type: str, target_type: str | None = None, target_id: str | None = None, metadata: dict | None = None):
        db = get_db()
        event = {
            "user_id": user_id,
            "event_type": event_type,
            "target_type": target_type,
            "target_id": target_id,
            "metadata": metadata or {},
            "created_at": datetime.now(timezone.utc).isoformat(),
        }
        doc_ref = db.collection("activity_events").document()
        doc_ref.set(event)
        return event

    @staticmethod
    def get_user_activity(user_id: str, limit: int = 50) -> list[dict]:
        db = get_db()
        docs = db.collection("activity_events").where("user_id", "==", user_id).order_by("created_at", direction="DESCENDING").limit(limit).get()
        return [{**doc.to_dict(), "event_id": doc.id} for doc in docs]

    @staticmethod
    def get_summary(user_id: str) -> dict:
        events = ActivityService.get_user_activity(user_id, 100)
        summary = {
            "total_events": len(events),
            "posts_created": sum(1 for e in events if e.get("event_type") == "POST_CREATED"),
            "likes_given": sum(1 for e in events if e.get("event_type") == "LIKE_ADDED"),
            "comments_given": sum(1 for e in events if e.get("event_type") == "COMMENT_CREATED"),
            "follows": sum(1 for e in events if e.get("event_type") == "FOLLOW_ADDED"),
        }
        return summary
