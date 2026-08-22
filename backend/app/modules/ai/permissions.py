from typing import Callable
from fastapi import Depends
from app.core.dependencies import get_current_user


class AIPermissions:
    @staticmethod
    def can_chat(user) -> bool:
        return True

    @staticmethod
    def can_access_history(user) -> bool:
        return True
