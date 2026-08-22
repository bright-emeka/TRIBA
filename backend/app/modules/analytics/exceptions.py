from app.core.exceptions import TRIBAException


class AnalyticsException(TRIBAException):
    pass


class EntityNotFoundError(AnalyticsException):
    def __init__(self):
        super().__init__("ENTITY_NOT_FOUND", "Entity not found", 404)
