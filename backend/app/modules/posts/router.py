from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
from app.modules.posts.schemas import PostCreate, PostUpdate
from app.modules.posts.repository import PostRepository
from app.modules.posts.exceptions import PostNotFoundError, PostPermissionError, InvalidPostContentError
from app.shared.responses import success, error
from app.modules.posts.permissions import get_post_writer
from datetime import datetime, timezone
from app.core.dependencies import get_current_user

router = APIRouter()


@router.post("/posts")
async def create_post(payload: PostCreate, user=Depends(get_current_user)):
    post_data = payload.model_dump()
    post_data.update({
        "author_id": user["uid"],
        "likes_count": 0,
        "comments_count": 0,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat(),
    })
    post = PostRepository.create(post_data)
    return success(post, status_code=201)


@router.get("/posts/{post_id}")
async def get_post(post_id: str, user=Depends(get_current_user)):
    post = PostRepository.get(post_id)
    if not post:
        raise PostNotFoundError()
    return success(post)


@router.patch("/posts/{post_id}")
async def update_post(post_id: str, payload: PostUpdate, user=Depends(get_current_user)):
    post = PostRepository.get(post_id)
    if not post:
        raise PostNotFoundError()
    if post.get("author_id") != user["uid"]:
        raise PostPermissionError()
    updates = payload.model_dump(exclude_unset=True)
    updates["updated_at"] = datetime.now(timezone.utc).isoformat()
    updated = PostRepository.update(post_id, updates)
    return success(updated)


@router.delete("/posts/{post_id}")
async def delete_post(post_id: str, user=Depends(get_current_user)):
    post = PostRepository.get(post_id)
    if not post:
        raise PostNotFoundError()
    if post.get("author_id") != user["uid"]:
        raise PostPermissionError()
    PostRepository.delete(post_id)
    return success(None, status_code=204)
