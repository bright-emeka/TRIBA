from google.cloud import firestore as gcf


class TrendModel:
    COLLECTION = "trends"

    @staticmethod
    def to_dict(data: dict) -> dict:
        return data

    @staticmethod
    def from_dict(data: dict, doc_id: str) -> dict:
        d = data.copy()
        d["trend_id"] = doc_id
        return d
