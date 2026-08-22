from app.modules.posts.repository import PostRepository
from datetime import datetime, timezone


class PostService:
    @staticmethod
    def create_post(author_id: str, content: str, visibility: str = "public") -> dict:
        post_data = {
            "author_id": author_id,
            "content": content,
            "visibility": visibility,
            "likes_count": 0,
            "comments_count": 0,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat(),
        }
        return PostRepository.create(post_data)

    @staticmethod
    def get_post(post_id: str) -> dict | None:
        return PostRepository.get(post_id)

    @staticmethod
    def update_post(post_id: str, updates: dict) -> dict:
        updates["updated_at"] = datetime.now(timezone.utc).isoformat()
        return PostRepository.update(post_id, updates)

    @staticmethod
    def delete_post(post_id: str):
        PostRepository.delete(post_id)
