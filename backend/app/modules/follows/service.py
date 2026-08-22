from app.modules.follows.repository import FollowRepository
from datetime import datetime, timezone


class FollowService:
    @staticmethod
    def follow_user(follower_id: str, following_id: str):
        if follower_id == following_id:
            raise ValueError("Cannot follow yourself")
        FollowRepository.follow(follower_id, following_id)

    @staticmethod
    def unfollow_user(follower_id: str, following_id: str):
        FollowRepository.unfollow(follower_id, following_id)

    @staticmethod
    def get_followers(user_id: str) -> list[dict]:
        return FollowRepository.get_followers(user_id)

    @staticmethod
    def get_following(user_id: str) -> list[dict]:
        return FollowRepository.get_following(user_id)
