from google.cloud import firestore as gcf


class ReportModel:
    COLLECTION = "reports"

    @staticmethod
    def to_dict(data: dict) -> dict:
        return data

    @staticmethod
    def from_dict(data: dict, doc_id: str) -> dict:
        d = data.copy()
        d["report_id"] = doc_id
        return d


class AuditLogModel:
    COLLECTION = "audit_logs"

    @staticmethod
    def to_dict(data: dict) -> dict:
        return data

    @staticmethod
    def from_dict(data: dict, doc_id: str) -> dict:
        d = data.copy()
        d["log_id"] = doc_id
        return d
