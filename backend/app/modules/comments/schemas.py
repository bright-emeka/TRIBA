from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class CommentBase(BaseModel):
    content: str


class CommentCreate(CommentBase):
    post_id: str


class CommentUpdate(BaseModel):
    content: Optional[str] = None
