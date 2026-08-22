from app.core.exceptions import TRIBAException


class AuthException(TRIBAException):
    pass


class UserNotFoundError(AuthException):
    def __init__(self):
        super().__init__("USER_NOT_FOUND", "User not found", 404)


class InvalidTokenError(AuthException):
    def __init__(self):
        super().__init__("INVALID_TOKEN", "Invalid authentication token", 401)
