from fastapi import APIRouter, Depends
from app.modules.notifications.service import NotificationService
from app.shared.responses import success
from app.core.dependencies import get_current_user

router = APIRouter()


@router.get("/notifications")
async def get_notifications(user=Depends(get_current_user)):
    notifications = NotificationService.get_notifications(user["uid"])
    return success(notifications)


@router.patch("/notifications/{notification_id}/read")
async def mark_read(notification_id: str, user=Depends(get_current_user)):
    NotificationService.mark_read(notification_id)
    return success({"read": True})


@router.patch("/notifications/read-all")
async def mark_all_read(user=Depends(get_current_user)):
    NotificationService.mark_all_read(user["uid"])
    return success({"read_all": True})
