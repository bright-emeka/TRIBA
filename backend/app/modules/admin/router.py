from fastapi import APIRouter, Depends, HTTPException
from app.modules.admin.service import AdminService
from app.shared.responses import success
from app.core.dependencies import get_admin_user

router = APIRouter()


@router.get("/admin/dashboard")
async def admin_dashboard(user=Depends(get_admin_user)):
    stats = AdminService.get_dashboard_stats()
    return success(stats)


@router.get("/admin/users")
async def list_users(q: str = "", user=Depends(get_admin_user)):
    users = AdminService.list_users(q)
    return success(users)


@router.get("/admin/users/{user_id}")
async def get_user(user_id: str, user=Depends(get_admin_user)):
    user_data = AdminService.get_user(user_id)
    if not user_data:
        raise HTTPException(status_code=404, detail="User not found")
    return success(user_data)


@router.patch("/admin/users/{user_id}")
async def update_user(user_id: str, updates: dict, user=Depends(get_admin_user)):
    updated = AdminService.update_user(user_id, updates)
    return success(updated)


@router.post("/admin/users/{user_id}/suspend")
async def suspend_user(user_id: str, user=Depends(get_admin_user)):
    AdminService.suspend_user(user_id)
    return success({"suspended": True})


@router.post("/admin/users/{user_id}/restore")
async def restore_user(user_id: str, user=Depends(get_admin_user)):
    AdminService.restore_user(user_id)
    return success({"restored": True})


@router.get("/admin/posts")
async def list_posts(user=Depends(get_admin_user)):
    posts = AdminService.list_posts()
    return success(posts)


@router.delete("/admin/posts/{post_id}")
async def delete_post(post_id: str, user=Depends(get_admin_user)):
    AdminService.delete_post(post_id)
    return success(None, status_code=204)


@router.get("/admin/comments")
async def list_comments(user=Depends(get_admin_user)):
    comments = AdminService.list_comments()
    return success(comments)


@router.delete("/admin/comments/{comment_id}")
async def delete_comment(comment_id: str, user=Depends(get_admin_user)):
    AdminService.delete_comment(comment_id)
    return success(None, status_code=204)


@router.get("/admin/audit-logs")
async def list_audit_logs(user=Depends(get_admin_user)):
    logs = AdminService.list_audit_logs()
    return success(logs)
