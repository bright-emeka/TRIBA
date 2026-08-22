from google.cloud import firestore as gcf


class ConversationModel:
    COLLECTION = "ai_conversations"

    @staticmethod
    def to_dict(data: dict) -> dict:
        return data

    @staticmethod
    def from_dict(data: dict, doc_id: str) -> dict:
        d = data.copy()
        d["conversation_id"] = doc_id
        return d


class AIMessageModel:
    COLLECTION = "ai_messages"

    @staticmethod
    def to_dict(data: dict) -> dict:
        return data

    @staticmethod
    def from_dict(data: dict, doc_id: str) -> dict:
        d = data.copy()
        d["message_id"] = doc_id
        return d
