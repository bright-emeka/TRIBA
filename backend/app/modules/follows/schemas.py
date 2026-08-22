from pydantic import BaseModel
from typing import Optional


class FollowCreate(BaseModel):
    following_id: str


class FollowResponse(BaseModel):
    follower_id: str
    following_id: str
    created_at: Optional[str] = None
