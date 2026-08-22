from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class DashboardStats(BaseModel):
    total_users: int = 0
    total_posts: int = 0
    total_comments: int = 0
    total_likes: int = 0
    total_follows: int = 0
    active_users_today: int = 0
    new_users_today: int = 0
    new_posts_today: int = 0


class ReportItem(BaseModel):
    report_id: str
    reporter_id: str
    target_type: str
    target_id: str
    reason: str
    status: str
    created_at: Optional[datetime] = None


class AuditLogEntry(BaseModel):
    log_id: str
    actor_id: str
    action: str
    target_type: str
    target_id: str
    metadata: Optional[dict] = None
    created_at: Optional[datetime] = None
