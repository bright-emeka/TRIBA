"""
Seed data script for TRIBA development.
"""
import asyncio
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))

async def seed():
    try:
        from app.core.firebase import get_db
        db = get_db()
        print("Connected to Firestore")
        
        test_user = {
            "uid": "test-user-123",
            "email": "test@example.com",
            "username": "testuser",
            "display_name": "Test User",
            "role": "user",
            "is_suspended": False,
            "followers_count": 0,
            "following_count": 0,
            "posts_count": 0,
            "created_at": "2024-01-01T00:00:00Z",
            "updated_at": "2024-01-01T00:00:00Z",
        }
        db.collection("users").document("test-user-123").set(test_user)
        print("Seeded test user")
        
        test_post = {
            "author_id": "test-user-123",
            "content": "Hello TRIBA!",
            "visibility": "public",
            "likes_count": 0,
            "comments_count": 0,
            "created_at": "2024-01-01T00:00:00Z",
            "updated_at": "2024-01-01T00:00:00Z",
        }
        db.collection("posts").add(test_post)
        print("Seeded test post")
        
    except Exception as e:
        print(f"Seeding failed: {e}")

if __name__ == "__main__":
    asyncio.run(seed())
