from google.cloud import firestore as gcf


class ProfileModel:
    COLLECTION = "profiles"

    @staticmethod
    def doc_id(user_id: str) -> str:
        return user_id

    @staticmethod
    def to_dict(data: dict) -> dict:
        return data

    @staticmethod
    def from_dict(data: dict, doc_id: str) -> dict:
        d = data.copy()
        d["user_id"] = doc_id
        return d
