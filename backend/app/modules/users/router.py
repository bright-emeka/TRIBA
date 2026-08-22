from fastapi import APIRouter, Depends, Query
from app.modules.users.schemas import UserUpdate
from app.modules.users.permissions import get_verified_user
from app.modules.users.repository import UserRepository
from app.modules.users.exceptions import UserNotFoundError
from app.shared.responses import success, error
from app.shared.utils import is_valid_username
from app.core.dependencies import get_current_user
from app.shared.enums import UserRole

router = APIRouter()


@router.get("/users/search")
async def search_users(q: str = Query(..., min_length=2), user=Depends(get_current_user)):
    users = UserRepository.search(q)
    return success(users)


@router.get("/users/{username}")
async def get_user(username: str, user=Depends(get_current_user)):
    user_data = UserRepository.get_by_username(username)
    if not user_data:
        raise UserNotFoundError()
    return success(user_data)


@router.patch("/users/me")
async def update_me(payload: UserUpdate, user=Depends(get_current_user)):
    updates = payload.model_dump(exclude_unset=True)
    if "username" in updates:
        if not is_valid_username(updates["username"]):
            from fastapi import HTTPException
            raise HTTPException(status_code=400, detail="Invalid username")
        if UserRepository.username_exists(updates["username"]):
            from fastapi import HTTPException
            raise HTTPException(status_code=409, detail="Username already taken")
    updated = UserRepository.update(user["uid"], updates)
    return success(updated)
