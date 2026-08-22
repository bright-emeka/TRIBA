from app.core.firebase import get_db
from datetime import datetime, timezone


class SearchRepository:
    @staticmethod
    def search_users(query: str) -> list[dict]:
        db = get_db()
        users = db.collection("users").where("username", ">=", query).where("username", "<=", query + "\uf8ff").limit(20).get()
        return [{**doc.to_dict(), "uid": doc.id} for doc in users]
