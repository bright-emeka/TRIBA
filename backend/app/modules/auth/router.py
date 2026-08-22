from fastapi import APIRouter, Depends, HTTPException, status
from app.modules.auth.schemas import UserSync
from app.modules.auth.permissions import get_authenticated_user
from app.modules.auth.repository import AuthRepository
from app.shared.responses import success
from app.core.dependencies import get_current_user

router = APIRouter()


@router.get("/auth/me")
async def get_me(user=Depends(get_current_user)):
    return success(user)


@router.post("/auth/sync")
async def sync_user(payload: UserSync, user=Depends(get_current_user)):
    data = payload.model_dump()
    created = AuthRepository.upsert_user(data)
    return success(created)
