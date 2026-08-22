from app.core.exceptions import TRIBAException


class UsersException(TRIBAException):
    pass


class UserNotFoundError(UsersException):
    def __init__(self):
        super().__init__("USER_NOT_FOUND", "User not found", 404)


class UserAlreadyExistsError(UsersException):
    def __init__(self):
        super().__init__("USER_ALREADY_EXISTS", "User already exists", 409)


class InvalidUsernameError(UsersException):
    def __init__(self):
        super().__init__("INVALID_USERNAME", "Invalid username format", 400)


class SuspendedUserError(UsersException):
    def __init__(self):
        super().__init__("SUSPENDED_USER", "User is suspended", 403)
