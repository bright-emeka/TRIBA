from pydantic import BaseModel
from typing import Optional, List, Any
from datetime import datetime


class Message(BaseModel):
    role: str
    content: str
    timestamp: Optional[datetime] = None


class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = None


class ChatResponse(BaseModel):
    response: str
    conversation_id: str
    tools_used: Optional[List[str]] = None


class ToolDefinition(BaseModel):
    name: str
    description: str
    parameters: dict
