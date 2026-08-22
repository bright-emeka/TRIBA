from typing import Callable
from fastapi import Depends
from app.core.dependencies import get_current_user


async def get_ai_user(user=Depends(get_current_user)):
    return user
