from datetime import datetime, timezone
from app.core.firebase import get_db


class AnalyticsService:
    @staticmethod
    def get_user_stats(user_id: str) -> dict:
        db = get_db()
        doc = db.collection("user_stats").document(user_id).get()
        if not doc.exists:
            return {"user_id": user_id, "posts_created_week": 0, "likes_given_week": 0, "comments_given_week": 0}
        d = doc.to_dict()
        d["user_id"] = user_id
        return d

    @staticmethod
    def get_platform_stats() -> dict:
        db = get_db()
        users = db.collection("users").count().get()
        posts = db.collection("posts").count().get()
        return {
            "total_users": users[0][0].value if users else 0,
            "total_posts": posts[0][0].value if posts else 0,
        }
