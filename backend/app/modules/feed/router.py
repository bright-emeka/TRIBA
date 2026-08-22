from fastapi import APIRouter, Depends
from app.modules.feed.service import FeedService
from app.shared.responses import success
from app.core.dependencies import get_current_user

router = APIRouter()


@router.get("/feed")
async def get_feed(limit: int = 20, cursor: str | None = None, user=Depends(get_current_user)):
    items, next_cursor, has_more = FeedService.get_feed(user["uid"], limit, cursor)
    return success({
        "data": items,
        "pagination": {
            "next_cursor": next_cursor,
            "has_next": has_more,
        },
    })
