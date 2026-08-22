from datetime import datetime, timezone


class NotificationRepository:
    @staticmethod
    def create(data: dict) -> dict:
        db = __import__("app.core.firebase", fromlist=["get_db"]).get_db()
        doc_ref = db.collection("notifications").document()
        data.update({
            "is_read": False,
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        doc_ref.set(data)
        d = data.copy()
        d["notification_id"] = doc_ref.id
        return d

    @staticmethod
    def get_for_user(user_id: str) -> list[dict]:
        db = __import__("app.core.firebase", fromlist=["get_db"]).get_db()
        docs = db.collection("notifications").where("recipient_id", "==", user_id).order_by("created_at", direction="DESCENDING").limit(50).get()
        return [{**doc.to_dict(), "notification_id": doc.id} for doc in docs]

    @staticmethod
    def mark_read(notification_id: str):
        db = __import__("app.core.firebase", fromlist=["get_db"]).get_db()
        db.collection("notifications").document(notification_id).update({"is_read": True})

    @staticmethod
    def mark_all_read(user_id: str):
        db = __import__("app.core.firebase", fromlist=["get_db"]).get_db()
        docs = db.collection("notifications").where("recipient_id", "==", user_id).where("is_read", "==", False).get()
        batch = db.batch()
        for doc in docs:
            batch.update(doc.reference, {"is_read": True})
        batch.commit()
