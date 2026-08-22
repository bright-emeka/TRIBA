from app.core.exceptions import TRIBAException


class CommentsException(TRIBAException):
    pass


class CommentNotFoundError(CommentsException):
    def __init__(self):
        super().__init__("COMMENT_NOT_FOUND", "Comment not found", 404)


class CommentPermissionError(CommentsException):
    def __init__(self):
        super().__init__("COMMENT_PERMISSION_ERROR", "Not authorized to modify this comment", 403)
