from app.modules.profiles.schemas import ProfileBase
from app.shared.utils import generate_id
from datetime import datetime, timezone
from app.core.firebase import get_bucket


class ProfileRepository:
    @staticmethod
    def get_by_username(username: str) -> dict | None:
        db = __import__("app.core.firebase", fromlist=["get_db"]).get_db()
        users = db.collection("users").where("username", "==", username).limit(1).get()
        for doc in users:
            d = doc.to_dict()
            d["uid"] = doc.id
            return d
        return None

    @staticmethod
    def update(uid: str, updates: dict) -> dict:
        db = __import__("app.core.firebase", fromlist=["get_db"]).get_db()
        updates["updated_at"] = datetime.now(timezone.utc).isoformat()
        db.collection("users").document(uid).update(updates)
        doc = db.collection("users").document(uid).get()
        d = doc.to_dict()
        d["uid"] = uid
        return d

    @staticmethod
    def upload_avatar(uid: str, file) -> str:
        bucket = get_bucket()
        blob = bucket.blob(f"avatars/{uid}/{generate_id()}")
        blob.upload_from_file(file.file, content_type=file.content_type)
        blob.make_public()
        return blob.public_url
