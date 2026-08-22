from app.modules.auth.models import AuthModel
from app.shared.utils import generate_id
from datetime import datetime, timezone


class AuthRepository:
    @staticmethod
    async def upsert_user(data: dict) -> dict:
        db = __import__("app.core.firebase", fromlist=["get_db"]).get_db()
        uid = data.get("uid")
        doc_ref = db.collection(AuthModel.COLLECTION).document(uid)
        doc = doc_ref.get()
        now = datetime.now(timezone.utc).isoformat()
        payload = {
            "uid": uid,
            "email": data.get("email", ""),
            "display_name": data.get("display_name", ""),
            "photo_url": data.get("photo_url"),
            "role": "user",
            "is_suspended": False,
            "created_at": doc.to_dict().get("created_at") if doc.exists else now,
            "updated_at": now,
            "last_active_at": now,
            "followers_count": 0,
            "following_count": 0,
            "posts_count": 0,
        }
        doc_ref.set(payload, merge=True)
        return payload
