from app.core.exceptions import TRIBAException


class FollowsException(TRIBAException):
    pass


class FollowNotFoundError(FollowsException):
    def __init__(self):
        super().__init__("FOLLOW_NOT_FOUND", "Follow relationship not found", 404)


class FollowAlreadyExistsError(FollowsException):
    def __init__(self):
        super().__init__("FOLLOW_ALREADY_EXISTS", "Already following this user", 409)


class SelfFollowError(FollowsException):
    def __init__(self):
        super().__init__("SELF_FOLLOW_ERROR", "Cannot follow yourself", 400)
