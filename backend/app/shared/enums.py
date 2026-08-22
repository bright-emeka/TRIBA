from enum import Enum


class UserRole(str, Enum):
    USER = "user"
    ADMIN = "admin"


class PostVisibility(str, Enum):
    PUBLIC = "public"
    FOLLOWERS_ONLY = "followers_only"
    PRIVATE = "private"


class NotificationType(str, Enum):
    FOLLOW = "follow"
    LIKE = "like"
    COMMENT = "comment"
    MENTION = "mention"
    SYSTEM = "system"


class ActivityEventType(str, Enum):
    POST_CREATED = "post_created"
    POST_DELETED = "post_deleted"
    COMMENT_CREATED = "comment_created"
    LIKE_ADDED = "like_added"
    LIKE_REMOVED = "like_removed"
    FOLLOW_ADDED = "follow_added"
    FOLLOW_REMOVED = "follow_removed"
    PROFILE_UPDATED = "profile_updated"
    USER_REGISTERED = "user_registered"


class ReportStatus(str, Enum):
    PENDING = "pending"
    RESOLVED = "resolved"
    DISMISSED = "dismissed"
