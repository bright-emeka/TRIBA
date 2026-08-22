import { pytest } from 'pytest-asyncio'
from httpx import AsyncClient, ASGITransport
from app.main import app

@pytest.fixture
async def client():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac

@pytest.mark.asyncio
async def test_search_endpoint(client):
    response = await client.get("/api/v1/search/users", params={"q": "test"})
    assert response.status_code == 200
