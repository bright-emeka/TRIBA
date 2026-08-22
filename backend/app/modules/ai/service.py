from app.core.firebase import get_db
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
        db = get_db()
        chat_ref = db.collection("ai_chats").document(user_id).collection("messages").document()
        chat_ref.set({
            "role": "user",
            "content": message,
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        chat_ref = db.collection("ai_chats").document(user_id).collection("messages").document()
        chat_ref.set({
            "role": "assistant",
            "content": assistant_message,
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        return {"role": "assistant", "content": assistant_message}

    @staticmethod
    def build_context(user_id: str, message: str) -> dict:
        context = {}
        context["user_id"] = user_id
        return context

    @staticmethod
    def get_history(user_id: str, limit: int = 50) -> list[dict]:
        db = get_db()
        docs = db.collection("ai_chats").document(user_id).collection("messages").order_by("created_at", direction="DESCENDING").limit(limit).get()
        return [{**doc.to_dict(), "message_id": doc.id} for doc in docs]

    @staticmethod
    def clear_history(user_id: str):
        db = get_db()
        docs = db.collection("ai_chats").document(user_id).collection("messages").get()
        batch = db.batch()
        for doc in docs:
            batch.delete(doc.reference)
        batch.commit()
