from typing import Callable
from fastapi import Depends
from app.core.dependencies import get_current_user
from app.shared.enums import PostVisibility


async def get_post_writer(user=Depends(get_current_user)):
    return user


def check_post_visibility(user_id: str, visibility: str, follower_ids: list) -> bool:
    if visibility == PostVisibility.PUBLIC:
        return True
    if visibility == PostVisibility.FOLLOWERS_ONLY:
        return user_id in follower_ids
    if visibility == PostVisibility.PRIVATE:
        return user_id == user_id
    return False
