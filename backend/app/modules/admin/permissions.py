from typing import Callable
from fastapi import Depends
from app.core.dependencies import get_admin_user


async def get_admin(user=Depends(get_admin_user)):
    return user
