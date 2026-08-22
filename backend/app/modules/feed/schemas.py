from pydantic import BaseModel
from typing import Optional, List, Any
from app.modules.posts.schemas import PostBase


class FeedItem(BaseModel):
    post_id: str
    author_id: str
    author_username: Optional[str] = None
    content: str
    visibility: str
    likes_count: int = 0
    comments_count: int = 0
    created_at: Optional[str] = None


class FeedResponse(BaseModel):
    items: List[FeedItem]
    next_cursor: Optional[str] = None
    has_more: bool = False
