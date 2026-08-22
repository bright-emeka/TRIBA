from app.core.exceptions import TRIBAException


class TrendsException(TRIBAException):
    pass


class TrendNotFoundError(TrendsException):
    def __init__(self):
        super().__init__("TREND_NOT_FOUND", "Trend not found", 404)
