from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class UserStats(BaseModel):
    user_id: str
    posts_count: int = 0
    followers_count: int = 0
    following_count: int = 0
    likes_received: int = 0
    comments_received: int = 0


class PlatformStats(BaseModel):
    total_users: int = 0
    total_posts: int = 0
    total_comments: int = 0
    total_likes: int = 0
    total_follows: int = 0
    active_users_today: int = 0
