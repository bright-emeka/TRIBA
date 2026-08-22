from google.cloud import firestore as gcf
from app.shared.enums import PostVisibility


class PostModel:
    COLLECTION = "posts"

    @staticmethod
    def to_dict(data: dict) -> dict:
        return data

    @staticmethod
    def from_dict(data: dict, doc_id: str) -> dict:
        d = data.copy()
        d["post_id"] = doc_id
        return d
