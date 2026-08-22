from app.shared.pagination import encode_cursor, decode_cursor
from app.core.firebase import get_db


class FeedService:
    @staticmethod
    def get_feed(user_id: str, limit: int = 20, cursor: str | None = None):
        db = get_db()
        following_docs = db.collection("users").document(user_id).collection("following").get()
        following_ids = [doc.to_dict()["following_id"] for doc in following_docs]
        following_ids.append(user_id)
        query = db.collection("posts").where("author_id", "in", following_ids).order_by("created_at", direction="DESCENDING")
        if cursor:
            query = query.start_after({"_cursor": decode_cursor(cursor)})
        docs = query.limit(limit + 1).get()
        items = []
        for doc in docs[:limit]:
            d = doc.to_dict()
            d["post_id"] = doc.id
            items.append(d)
        next_cursor = None
        has_more = len(docs) > limit
        if has_more:
            last_doc = docs[limit - 1]
            next_cursor = encode_cursor(last_doc.id)
        return items, next_cursor, has_more
