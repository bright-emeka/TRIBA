from fastapi import APIRouter, Depends, HTTPException
from app.modules.comments.schemas import CommentCreate, CommentUpdate
from app.modules.comments.repository import CommentRepository
from app.shared.responses import success
from datetime import datetime, timezone
from app.core.dependencies import get_current_user

router = APIRouter()


@router.post("/posts/{post_id}/comments")
async def create_comment(post_id: str, payload: CommentCreate, user=Depends(get_current_user)):
    comment_data = payload.model_dump()
    comment_data.update({
        "post_id": post_id,
        "author_id": user["uid"],
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat(),
    })
    comment = CommentRepository.create(comment_data)
    return success(comment, status_code=201)


@router.get("/posts/{post_id}/comments")
async def list_comments(post_id: str, user=Depends(get_current_user)):
    comments = CommentRepository.list_by_post(post_id)
    return success(comments)


@router.patch("/comments/{comment_id}")
async def update_comment(comment_id: str, payload: CommentUpdate, user=Depends(get_current_user)):
    comment = CommentRepository.get(comment_id)
    if not comment:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Comment not found")
    if comment.get("author_id") != user["uid"]:
        from fastapi import HTTPException
        raise HTTPException(status_code=403, detail="Cannot update another user's comment")
    updates = payload.model_dump(exclude_unset=True)
    updates["updated_at"] = datetime.now(timezone.utc).isoformat()
    updated = CommentRepository.update(comment_id, updates)
    return success(updated)


@router.delete("/comments/{comment_id}")
async def delete_comment(comment_id: str, user=Depends(get_current_user)):
    comment = CommentRepository.get(comment_id)
    if not comment:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Comment not found")
    if comment.get("author_id") != user["uid"]:
        from fastapi import HTTPException
        raise HTTPException(status_code=403, detail="Cannot delete another user's comment")
    CommentRepository.delete(comment_id)
    return success(None, status_code=204)
