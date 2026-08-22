from fastapi import APIRouter, Depends
from app.modules.analytics.service import AnalyticsService
from app.shared.responses import success
from app.core.dependencies import get_current_user, get_admin_user

router = APIRouter()


@router.get("/analytics/me/stats")
async def get_my_stats(user=Depends(get_current_user)):
    stats = AnalyticsService.get_user_stats(user["uid"])
    return success(stats)


@router.get("/analytics/platform/stats")
async def get_platform_stats(user=Depends(get_admin_user)):
    stats = AnalyticsService.get_platform_stats()
    return success(stats)
