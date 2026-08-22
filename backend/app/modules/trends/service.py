from app.core.firebase import get_db


class TrendsService:
    @staticmethod
    def get_trending_topics() -> list[dict]:
        db = get_db()
        docs = db.collection("trends").order_by("score", direction="DESCENDING").limit(10).get()
        return [doc.to_dict() for doc in docs]

    @staticmethod
    def get_trending_posts() -> list[dict]:
        db = get_db()
        docs = db.collection("posts").order_by("likes_count", direction="DESCENDING").limit(10).get()
        return [{**doc.to_dict(), "post_id": doc.id} for doc in docs]
