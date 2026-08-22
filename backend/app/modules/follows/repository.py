from datetime import datetime, timezone


class FollowRepository:
    @staticmethod
    def follow(follower_id: str, following_id: str):
        db = __import__("app.core.firebase", fromlist=["get_db"]).get_db()
        now = datetime.now(timezone.utc).isoformat()
        db.collection("users").document(following_id).collection("followers").document(follower_id).set({
            "follower_id": follower_id,
            "created_at": now,
        })
        db.collection("users").document(follower_id).collection("following").document(following_id).set({
            "following_id": following_id,
            "created_at": now,
        })

    @staticmethod
    def unfollow(follower_id: str, following_id: str):
        db = __import__("app.core.firebase", fromlist=["get_db"]).get_db()
        db.collection("users").document(following_id).collection("followers").document(follower_id).delete()
        db.collection("users").document(follower_id).collection("following").document(following_id).delete()

    @staticmethod
    def get_followers(user_id: str) -> list[dict]:
        db = __import__("app.core.firebase", fromlist=["get_db"]).get_db()
        docs = db.collection("users").document(user_id).collection("followers").get()
        return [doc.to_dict() for doc in docs]

    @staticmethod
    def get_following(user_id: str) -> list[dict]:
        db = __import__("app.core.firebase", fromlist=["get_db"]).get_db()
        docs = db.collection("users").document(user_id).collection("following").get()
        return [doc.to_dict() for doc in docs]
