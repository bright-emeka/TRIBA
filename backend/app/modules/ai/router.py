from fastapi import APIRouter, Depends, HTTPException
from app.modules.ai.service import AIService
from app.shared.responses import success
from app.core.dependencies import get_current_user
from pydantic import BaseModel
from typing import Optional

router = APIRouter()


class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = None


@router.post("/ai/chat")
async def chat(request: ChatRequest, user=Depends(get_current_user)):
    response = await AIService.chat(user["uid"], request.message)
    return success(response)


@router.get("/ai/history")
async def get_history(limit: int = 50, user=Depends(get_current_user)):
    history = AIService.get_history(user["uid"], limit)
    return success(history)


@router.delete("/ai/history")
async def clear_history(user=Depends(get_current_user)):
    AIService.clear_history(user["uid"])
    return success({"cleared": True})
