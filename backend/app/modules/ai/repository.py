from app.core.firebase import get_db
from datetime import datetime, timezone


class AIRepository:
    @staticmethod
    def save_message(user_id: str, role: str, content: str) -> dict:
        db = get_db()
        doc_ref = db.collection("ai_chats").document(user_id).collection("messages").document()
        message = {
            "role": role,
            "content": content,
            "created_at": datetime.now(timezone.utc).isoformat(),
        }
        doc_ref.set(message)
        d = message.copy()
        d["message_id"] = doc_ref.id
        return d

    @staticmethod
    def get_history(user_id: str, limit: int = 50) -> list[dict]:
        db = get_db()
        docs = db.collection("ai_chats").document(user_id).collection("messages").order_by("created_at", direction="DESCENDING").limit(limit).get()
        return [{**doc.to_dict(), "message_id": doc.id} for doc in docs]

    @staticmethod
    def clear_history(user_id: str):
        db = get_db()
        docs = db.collection("ai_chats").document(user_id).collection("messages").get()
        batch = db.batch()
        for doc in docs:
            batch.delete(doc.reference)
        batch.commit()
