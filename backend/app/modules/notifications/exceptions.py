from app.core.exceptions import TRIBAException


class NotificationsException(TRIBAException):
    pass


class NotificationNotFoundError(NotificationsException):
    def __init__(self):
        super().__init__("NOTIFICATION_NOT_FOUND", "Notification not found", 404)
