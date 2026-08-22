from fastapi import APIRouter, Depends, File, UploadFile, Form
from app.modules.profiles.schemas import ProfileUpdate
from app.modules.profiles.repository import ProfileRepository
from app.shared.responses import success, error
from app.core.dependencies import get_current_user

router = APIRouter()


@router.get("/profiles/{username}")
async def get_profile(username: str, user=Depends(get_current_user)):
    profile = ProfileRepository.get_by_username(username)
    if not profile:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Profile not found")
    return success(profile)


@router.patch("/profiles/{username}")
async def update_profile(username: str, payload: ProfileUpdate, user=Depends(get_current_user)):
    if user.get("username") != username:
        from fastapi import HTTPException
        raise HTTPException(status_code=403, detail="Cannot update another user's profile")
    updates = payload.model_dump(exclude_unset=True)
    updated = ProfileRepository.update(user["uid"], updates)
    return success(updated)


@router.post("/profiles/avatar")
async def upload_avatar(file: UploadFile = File(...), user=Depends(get_current_user)):
    url = ProfileRepository.upload_avatar(user["uid"], file)
    ProfileRepository.update(user["uid"], {"avatar_url": url})
    return success({"avatar_url": url})
