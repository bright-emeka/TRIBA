from google.cloud import firestore as gcf


class NotificationModel:
    COLLECTION = "notifications"

    @staticmethod
    def to_dict(data: dict) -> dict:
        return data

    @staticmethod
    def from_dict(data: dict, doc_id: str) -> dict:
        d = data.copy()
        d["notification_id"] = doc_id
        return d
