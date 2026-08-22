from fastapi import APIRouter, Depends, Query
from app.modules.search.service import SearchService
from app.shared.responses import success
from app.core.dependencies import get_current_user

router = APIRouter()


@router.get("/search/users")
async def search_users(q: str = Query(..., min_length=2), user=Depends(get_current_user)):
    results = SearchService.search_users(q)
    return success(results)
