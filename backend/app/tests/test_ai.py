import { pytest } from 'pytest-asyncio'
from httpx import AsyncClient, ASGITransport
from app.main import app

@pytest.fixture
async def client():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac

@pytest.mark.asyncio
async def test_ai_chat(client):
    response = await client.post("/api/v1/ai/chat", json={"message": "hello"})
    assert response.status_code == 401

@pytest.mark.asyncio
async def test_ai_history(client):
    response = await client.get("/api/v1/ai/history")
    assert response.status_code == 401
