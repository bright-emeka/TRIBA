from fastapi import APIRouter, Depends
from app.modules.trends.service import TrendsService
from app.shared.responses import success
from app.core.dependencies import get_current_user

router = APIRouter()


@router.get("/trends/topics")
async def get_trending_topics(user=Depends(get_current_user)):
    topics = TrendsService.get_trending_topics()
    return success(topics)


@router.get("/trends/posts")
async def get_trending_posts(user=Depends(get_current_user)):
    posts = TrendsService.get_trending_posts()
    return success(posts)
