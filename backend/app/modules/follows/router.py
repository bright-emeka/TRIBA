from fastapi import APIRouter, Depends, HTTPException
from app.modules.follows.repository import FollowRepository
from app.shared.responses import success
from app.core.dependencies import get_current_user
from datetime import datetime, timezone

router = APIRouter()


@router.post("/users/{user_id}/follow")
async def follow_user(user_id: str, user=Depends(get_current_user)):
    if user["uid"] == user_id:
        from fastapi import HTTPException
        raise HTTPException(status_code=400, detail="Cannot follow yourself")
    FollowRepository.follow(user["uid"], user_id)
    return success({"following": True}, status_code=201)


@router.delete("/users/{user_id}/follow")
async def unfollow_user(user_id: str, user=Depends(get_current_user)):
    FollowRepository.unfollow(user["uid"], user_id)
    return success({"following": False}, status_code=204)


@router.get("/users/{user_id}/followers")
async def get_followers(user_id: str, user=Depends(get_current_user)):
    followers = FollowRepository.get_followers(user_id)
    return success(followers)


@router.get("/users/{user_id}/following")
async def get_following(user_id: str, user=Depends(get_current_user)):
    following = FollowRepository.get_following(user_id)
    return success(following)
