from app.modules.feed.service import FeedService
from app.shared.pagination import encode_cursor


class FeedRepository:
    @staticmethod
    def get_feed(user_id: str, limit: int = 20, cursor: str | None = None):
        return FeedService.get_feed(user_id, limit, cursor)
