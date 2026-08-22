from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.shared.enums import ActivityEventType


class ActivityEventBase(BaseModel):
    actor_id: str
    event_type: ActivityEventType
    entity_id: Optional[str] = None
    entity_type: Optional[str] = None
    metadata: Optional[dict] = None


class ActivityEventCreate(ActivityEventBase):
    pass
