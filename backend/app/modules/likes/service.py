from app.modules.likes.repository import LikeRepository
from datetime import datetime, timezone


class LikeService:
    @staticmethod
    def like_post(user_id: str, post_id: str) -> dict:
        like_data = {
            "user_id": user_id,
            "post_id": post_id,
            "created_at": datetime.now(timezone.utc).isoformat(),
        }
        return LikeRepository.like(like_data)

    @staticmethod
    def unlike_post(user_id: str, post_id: str):
        LikeRepository.unlike(user_id, post_id)
