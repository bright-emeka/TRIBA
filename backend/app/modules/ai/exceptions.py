from app.core.exceptions import TRIBAException


class AIException(TRIBAException):
    pass


class AIConversationNotFoundError(AIException):
    def __init__(self):
        super().__init__("CONVERSATION_NOT_FOUND", "Conversation not found", 404)


class AIRateLimitError(AIException):
    def __init__(self):
        super().__init__("RATE_LIMIT_EXCEEDED", "AI rate limit exceeded", 429)


class AIToolError(AIException):
    def __init__(self, detail: str):
        super().__init__("AI_TOOL_ERROR", detail, 500)
