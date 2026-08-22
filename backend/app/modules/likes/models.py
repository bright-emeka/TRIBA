from google.cloud import firestore as gcf


class LikeModel:
    COLLECTION = "likes"

    @staticmethod
    def doc_id(user_id: str, post_id: str) -> str:
        return f"{user_id}_{post_id}"

    @staticmethod
    def to_dict(data: dict) -> dict:
        return data
