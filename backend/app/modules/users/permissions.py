from typing import Callable
from fastapi import Depends, HTTPException, status
from app.core.dependencies import get_current_user
from app.shared.enums import UserRole
from app.modules.users.exceptions import SuspendedUserError
from app.core.exceptions import TRIBAException


async def get_verified_user(user=Depends(get_current_user)):
    if user.get("is_suspended"):
        raise SuspendedUserError()
    return user


def require_role(*roles: UserRole) -> Callable:
    async def checker(user=Depends(get_current_user)):
        if user.get("role") not in roles:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions")
        return user
    return checker
