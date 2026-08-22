from app.shared.utils import generate_id
from datetime import datetime, timezone


class CommentRepository:
    @staticmethod
    def create(data: dict) -> dict:
        db = __import__("app.core.firebase", fromlist=["get_db"]).get_db()
        doc_ref = db.collection("posts").document(data["post_id"]).collection("comments").document()
        doc_ref.set(data)
        d = data.copy()
        d["comment_id"] = doc_ref.id
        return d

    @staticmethod
    def get(comment_id: str) -> dict | None:
        db = __import__("app.core.firebase", fromlist=["get_db"]).get_db()
        for post in db.collection("posts").stream():
            doc = post.reference.collection("comments").document(comment_id).get()
            if doc.exists:
                d = doc.to_dict()
                d["comment_id"] = doc.id
                return d
        return None

    @staticmethod
    def update(comment_id: str, updates: dict) -> dict:
        db = __import__("app.core.firebase", fromlist=["get_db"]).get_db()
        for post in db.collection("posts").stream():
            doc_ref = post.reference.collection("comments").document(comment_id)
            if doc_ref.get().exists:
                doc_ref.update(updates)
                doc = doc_ref.get()
                d = doc.to_dict()
                d["comment_id"] = comment_id
                return d
        return {}

    @staticmethod
    def delete(comment_id: str):
        db = __import__("app.core.firebase", fromlist=["get_db"]).get_db()
        for post in db.collection("posts").stream():
            doc_ref = post.reference.collection("comments").document(comment_id)
            if doc_ref.get().exists:
                doc_ref.delete()
                return

    @staticmethod
    def list_by_post(post_id: str) -> list[dict]:
        db = __import__("app.core.firebase", fromlist=["get_db"]).get_db()
        comments = db.collection("posts").document(post_id).collection("comments").order_by("created_at").get()
        return [{**doc.to_dict(), "comment_id": doc.id} for doc in comments]
