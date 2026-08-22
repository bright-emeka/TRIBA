from google.cloud import firestore as gcf


class AnalyticsModel:
    COLLECTION = "analytics"

    @staticmethod
    def doc_id(entity_type: str, entity_id: str) -> str:
        return f"{entity_type}_{entity_id}"

    @staticmethod
    def to_dict(data: dict) -> dict:
        return data
