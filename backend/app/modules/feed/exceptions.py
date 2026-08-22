from app.core.exceptions import TRIBAException


class FeedException(TRIBAException):
    pass


class EmptyFeedError(FeedException):
    def __init__(self):
        super().__init__("EMPTY_FEED", "Feed is empty", 404)
