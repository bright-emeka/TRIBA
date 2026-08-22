from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.shared.enums import PostVisibility


class PostBase(BaseModel):
    content: str
    visibility: PostVisibility = PostVisibility.PUBLIC


class PostCreate(PostBase):
    pass


class PostUpdate(BaseModel):
    content: Optional[str] = None
    visibility: Optional[PostVisibility] = None
