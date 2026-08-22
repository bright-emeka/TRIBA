from typing import Callable
from fastapi import Depends
from app.core.dependencies import get_current_user


async def get_notification_recipient(user=Depends(get_current_user)):
    return user
