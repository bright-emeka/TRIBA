from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.shared.enums import NotificationType


class NotificationBase(BaseModel):
    recipient_id: str
    actor_id: str
    type: NotificationType
    entity_id: Optional[str] = None
    entity_type: Optional[str] = None


class NotificationCreate(NotificationBase):
    pass


class NotificationRead(BaseModel):
    notification_id: str
    is_read: bool
    read_at: Optional[datetime] = None
