from google.cloud import firestore as gcf


class FollowModel:
    COLLECTION = "follows"

    @staticmethod
    def doc_id(follower_id: str, following_id: str) -> str:
        return f"{follower_id}_{following_id}"

    @staticmethod
    def to_dict(data: dict) -> dict:
        return data
