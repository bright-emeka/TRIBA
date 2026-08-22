from fastapi import APIRouter, Depends
from app.modules.activity.service import ActivityService
from app.shared.responses import success
from app.core.dependencies import get_current_user

router = APIRouter()


@router.get("/activity/me")
async def get_my_activity(limit: int = 50, user=Depends(get_current_user)):
    events = ActivityService.get_user_activity(user["uid"], limit)
    return success(events)


@router.get("/activity/me/summary")
async def get_activity_summary(user=Depends(get_current_user)):
    summary = ActivityService.get_summary(user["uid"])
    return success(summary)
