from pydantic import BaseModel
from typing import Optional, Dict, Any


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserSync(BaseModel):
    uid: str
    email: str
    display_name: str
    photo_url: Optional[str] = None
