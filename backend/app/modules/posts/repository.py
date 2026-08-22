from app.modules.posts.models import PostModel
from datetime import datetime, timezone


class PostRepository:
    @staticmethod
    def create(data: dict) -> dict:
        db = __import__("app.core.firebase", fromlist=["get_db"]).get_db()
        doc_ref = db.collection(PostModel.COLLECTION).document()
        doc_ref.set(data)
        d = data.copy()
        d["post_id"] = doc_ref.id
        return d

    @staticmethod
    def get(post_id: str) -> dict | None:
        db = __import__("app.core.firebase", fromlist=["get_db"]).get_db()
        doc = db.collection(PostModel.COLLECTION).document(post_id).get()
        if not doc.exists:
            return None
        d = doc.to_dict()
        d["post_id"] = doc.id
        return d

    @staticmethod
    def update(post_id: str, updates: dict) -> dict:
        db = __import__("app.core.firebase", fromlist=["get_db"]).get_db()
        db.collection(PostModel.COLLECTION).document(post_id).update(updates)
        doc = db.collection(PostModel.COLLECTION).document(post_id).get()
        d = doc.to_dict()
        d["post_id"] = post_id
        return d

    @staticmethod
    def delete(post_id: str):
        db = __import__("app.core.firebase", fromlist=["get_db"]).get_db()
        db.collection(PostModel.COLLECTION).document(post_id).delete()
