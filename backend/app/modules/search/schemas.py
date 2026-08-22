from pydantic import BaseModel
from typing import Optional, List
from app.modules.users.schemas import UserBase


class UserSearchResult(BaseModel):
    users: List[UserBase]
    next_cursor: Optional[str] = None
    has_more: bool = False


class SearchQuery(BaseModel):
    query: str
    limit: int = 20
