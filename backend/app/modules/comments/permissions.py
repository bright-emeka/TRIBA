from typing import Callable
from fastapi import Depends
from app.core.dependencies import get_current_user


async def get_comment_author(user=Depends(get_current_user)):
    return user


async def get_post_owner_or_admin(user=Depends(get_current_user)):
    return user
