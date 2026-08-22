from app.modules.comments.repository import CommentRepository
from datetime import datetime, timezone


class CommentService:
    @staticmethod
    def create_comment(post_id: str, author_id: str, content: str) -> dict:
        comment_data = {
            "post_id": post_id,
            "author_id": author_id,
            "content": content,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat(),
        }
        return CommentRepository.create(comment_data)

    @staticmethod
    def get_comments(post_id: str) -> list[dict]:
        return CommentRepository.list_by_post(post_id)

    @staticmethod
    def update_comment(comment_id: str, content: str) -> dict:
        updates = {"content": content, "updated_at": datetime.now(timezone.utc).isoformat()}
        return CommentRepository.update(comment_id, updates)

    @staticmethod
    def delete_comment(comment_id: str):
        CommentRepository.delete(comment_id)
