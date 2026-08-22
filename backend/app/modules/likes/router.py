from fastapi import APIRouter, Depends
from app.modules.likes.repository import LikeRepository
from app.shared.responses import success
from app.core.dependencies import get_current_user
from datetime import datetime, timezone

router = APIRouter()


@router.post("/posts/{post_id}/like")
async def like_post(post_id: str, user=Depends(get_current_user)):
    like_data = {
        "user_id": user["uid"],
        "post_id": post_id,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    liked = LikeRepository.like(like_data)
    return success(liked, status_code=201)


@router.delete("/posts/{post_id}/like")
async def unlike_post(post_id: str, user=Depends(get_current_user)):
    LikeRepository.unlike(user["uid"], post_id)
    return success(None, status_code=204)
