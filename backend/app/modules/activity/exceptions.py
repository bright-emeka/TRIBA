from app.core.exceptions import TRIBAException


class ActivityException(TRIBAException):
    pass


class ActivityEventNotFoundError(ActivityException):
    def __init__(self):
        super().__init__("ACTIVITY_EVENT_NOT_FOUND", "Activity event not found", 404)
