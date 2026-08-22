import { pytest } from 'pytest-asyncio'
from httpx import AsyncClient, ASGITransport
from app.main import app

@pytest.fixture
async def client():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac

@pytest.mark.asyncio
async def test_trends_topics(client):
    response = await client.get("/api/v1/trends/topics")
    assert response.status_code == 401

@pytest.mark.asyncio
async def test_trends_posts(client):
    response = await client.get("/api/v1/trends/posts")
    assert response.status_code == 401
