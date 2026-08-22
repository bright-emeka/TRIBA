from app.modules.ai.repository import AIRepository
from datetime import datetime, timezone
import google.generativeai as genai
from app.core.config import settings
import json


class AIService:
    @staticmethod
    async def chat(user_id: str, message: str) -> dict:
        genai.configure(api_key=settings.GEMINI_API_KEY)
        model = genai.GenerativeModel("gemini-pro")
        context = AIService.build_context(user_id, message)
        prompt = f"You are TRIBA assistant. Context: {json.dumps(context)}\nUser: {message}\nAssistant:"
        response = model.generate_content(prompt)
        assistant_message = response.text
        AIRepository.save_message(user_id, "user", message)
        AIRepository.save_message(user_id, "assistant", assistant_message)
        return {
            "role": "assistant",
            "content": assistant_message,
            "timestamp": datetime.now(timezone.utc).isoformat(),
        }

    @staticmethod
    def build_context(user_id: str, message: str) -> dict:
        return {"user_id": user_id, "message": message}

    @staticmethod
    def get_history(user_id: str, limit: int = 50) -> list[dict]:
        return AIRepository.get_history(user_id, limit)

    @staticmethod
    def clear_history(user_id: str):
        AIRepository.clear_history(user_id)
