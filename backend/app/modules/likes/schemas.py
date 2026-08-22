from pydantic import BaseModel
from typing import Optional


class LikeCreate(BaseModel):
    post_id: str


class LikeResponse(BaseModel):
    post_id: str
    user_id: str
    created_at: Optional[str] = None
