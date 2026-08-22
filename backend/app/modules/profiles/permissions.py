from typing import Callable
from fastapi import Depends
from app.core.dependencies import get_current_user
from app.modules.profiles.exceptions import ProfilePermissionError


async def get_profile_owner(user=Depends(get_current_user)):
    return user


def require_profile_owner(username: str) -> Callable:
    async def checker(user=Depends(get_current_user)):
        if user.get("username") != username:
            raise ProfilePermissionError()
        return user
    return checker
