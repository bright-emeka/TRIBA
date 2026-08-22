from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from app.shared.enums import UserRole


class UserBase(BaseModel):
    uid: str
    email: EmailStr
    username: str
    display_name: str
    role: UserRole = UserRole.USER
    is_suspended: bool = False
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None


class UserCreate(BaseModel):
    uid: str
    email: EmailStr
    username: str
    display_name: str


class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    display_name: Optional[str] = None
    role: Optional[UserRole] = None
    is_suspended: Optional[bool] = None
