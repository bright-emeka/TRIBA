from app.core.exceptions import TRIBAException


class PostsException(TRIBAException):
    pass


class PostNotFoundError(PostsException):
    def __init__(self):
        super().__init__("POST_NOT_FOUND", "Post not found", 404)


class PostPermissionError(PostsException):
    def __init__(self):
        super().__init__("POST_PERMISSION_ERROR", "Not authorized to modify this post", 403)


class InvalidPostContentError(PostsException):
    def __init__(self):
        super().__init__("INVALID_POST_CONTENT", "Post content is invalid", 400)
