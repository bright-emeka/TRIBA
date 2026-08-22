from app.core.exceptions import TRIBAException


class LikesException(TRIBAException):
    pass


class LikeNotFoundError(LikesException):
    def __init__(self):
        super().__init__("LIKE_NOT_FOUND", "Like not found", 404)


class LikeAlreadyExistsError(LikesException):
    def __init__(self):
        super().__init__("LIKE_ALREADY_EXISTS", "Like already exists", 409)
