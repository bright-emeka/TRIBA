from datetime import datetime, timezone


class LikeRepository:
    @staticmethod
    def like(data: dict) -> dict:
        db = __import__("app.core.firebase", fromlist=["get_db"]).get_db()
        like_ref = db.collection("posts").document(data["post_id"]).collection("likes").document(data["user_id"])
        like_ref.set(data)
        return data

    @staticmethod
    def unlike(user_id: str, post_id: str):
        db = __import__("app.core.firebase", fromlist=["get_db"]).get_db()
        db.collection("posts").document(post_id).collection("likes").document(user_id).delete()
