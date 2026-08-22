from app.modules.users.models import UserModel
from app.shared.utils import generate_id
from datetime import datetime, timezone


class UserRepository:
    @staticmethod
    def get_by_username(username: str) -> dict | None:
        db = __import__("app.core.firebase", fromlist=["get_db"]).get_db()
        users = db.collection(UserModel.COLLECTION).where("username", "==", username).limit(1).get()
        for doc in users:
            d = doc.to_dict()
            d["uid"] = doc.id
            return d
        return None

    @staticmethod
    def username_exists(username: str) -> bool:
        return UserRepository.get_by_username(username) is not None

    @staticmethod
    def search(query: str) -> list[dict]:
        db = __import__("app.core.firebase", fromlist=["get_db"]).get_db()
        users = db.collection(UserModel.COLLECTION).where("username", ">=", query).where("username", "<=", query + "\uf8ff").limit(20).get()
        results = []
        for doc in users:
            d = doc.to_dict()
            d["uid"] = doc.id
            results.append(d)
        return results

    @staticmethod
    def update(uid: str, updates: dict) -> dict:
        db = __import__("app.core.firebase", fromlist=["get_db"]).get_db()
        updates["updated_at"] = datetime.now(timezone.utc).isoformat()
        db.collection(UserModel.COLLECTION).document(uid).update(updates)
        doc = db.collection(UserModel.COLLECTION).document(uid).get()
        d = doc.to_dict()
        d["uid"] = uid
        return d
