from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class TrendTopic(BaseModel):
    topic_id: str
    name: str
    post_count: int = 0
    score: float = 0.0
    created_at: Optional[datetime] = None


class TrendingPost(BaseModel):
    post_id: str
    author_id: str
    content: str
    likes_count: int = 0
    comments_count: int = 0
    score: float = 0.0
