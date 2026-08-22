from app.core.exceptions import TRIBAException


class SearchException(TRIBAException):
    pass


class SearchQueryTooShortError(SearchException):
    def __init__(self):
        super().__init__("SEARCH_QUERY_TOO_SHORT", "Search query must be at least 2 characters", 400)
