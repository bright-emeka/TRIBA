from typing import Generic, TypeVar, List, Optional
from pydantic import BaseModel

T = TypeVar("T")


class CursorPage(BaseModel, Generic[T]):
    items: List[T]
    next_cursor: Optional[str] = None
    has_more: bool = False


def encode_cursor(record_id: str) -> str:
    import base64
    return base64.b64encode(record_id.encode()).decode()


def decode_cursor(cursor: str) -> str:
    import base64
    return base64.b64decode(cursor.encode()).decode()
