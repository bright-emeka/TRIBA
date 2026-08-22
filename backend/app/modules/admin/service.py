from app.core.firebase import get_db
from datetime import datetime, timezone


class AdminService:
    @staticmethod
    def get_dashboard_stats() -> dict:
        db = get_db()
        users = db.collection("users").count().get()
        posts = db.collection("posts").count().get()
        comments = 0
        for post in db.collection("posts").stream():
            post_comments = post.reference.collection("comments").count().get()
            comments += post_comments[0][0].value if post_comments else 0
        return {
            "total_users": users[0][0].value if users else 0,
            "total_posts": posts[0][0].value if posts else 0,
            "total_comments": comments,
        }

    @staticmethod
    def list_users(query: str = "") -> list[dict]:
        db = get_db()
        users = db.collection("users").limit(50).get()
        return [{**doc.to_dict(), "uid": doc.id} for doc in users]

    @staticmethod
    def get_user(user_id: str) -> dict | None:
        db = get_db()
        doc = db.collection("users").document(user_id).get()
        if not doc.exists:
            return None
        d = doc.to_dict()
        d["uid"] = user_id
        return d

    @staticmethod
    def update_user(user_id: str, updates: dict) -> dict:
        db = get_db()
        db.collection("users").document(user_id).update(updates)
        doc = db.collection("users").document(user_id).get()
        d = doc.to_dict()
        d["uid"] = user_id
        return d

    @staticmethod
    def suspend_user(user_id: str):
        db = get_db()
        db.collection("users").document(user_id).update({"is_suspended": True})
        AdminService._log(user_id, "user_suspended")

    @staticmethod
    def restore_user(user_id: str):
        db = get_db()
        db.collection("users").document(user_id).update({"is_suspended": False})
        AdminService._log(user_id, "user_restored")

    @staticmethod
    def list_posts() -> list[dict]:
        db = get_db()
        docs = db.collection("posts").limit(50).get()
        return [{**doc.to_dict(), "post_id": doc.id} for doc in docs]

    @staticmethod
    def delete_post(post_id: str):
        db = get_db()
        db.collection("posts").document(post_id).delete()
        AdminService._log(post_id, "post_deleted", "post")

    @staticmethod
    def list_comments() -> list[dict]:
        db = get_db()
        comments = []
        for post in db.collection("posts").stream():
            docs = post.reference.collection("comments").limit(100).get()
            for doc in docs:
                comments.append({**doc.to_dict(), "comment_id": doc.id})
        return comments

    @staticmethod
    def delete_comment(comment_id: str):
        db = get_db()
        for post in db.collection("posts").stream():
            doc_ref = post.reference.collection("comments").document(comment_id)
            if doc_ref.get().exists:
                doc_ref.delete()
                AdminService._log(comment_id, "comment_deleted", "comment")
                return

    @staticmethod
    def list_audit_logs() -> list[dict]:
        db = get_db()
        docs = db.collection("admin_audit_logs").order_by("created_at", direction="DESCENDING").limit(100).get()
        return [doc.to_dict() for doc in docs]

    @staticmethod
    def _log(target_id: str, action: str, target_type: str = "user"):
        db = get_db()
        db.collection("admin_audit_logs").add({
            "admin_id": "system",
            "action": action,
            "target_type": target_type,
            "target_id": target_id,
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
