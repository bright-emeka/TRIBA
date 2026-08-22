import { pytest } from 'pytest-asyncio'
from httpx import AsyncClient, ASGITransport
from app.main import app

@pytest.fixture
async def client():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac

@pytest.mark.asyncio
async def test_admin_dashboard(client):
    response = await client.get("/api/v1/admin/dashboard")
    assert response.status_code == 401

@pytest.mark.asyncio
async def test_admin_users(client):
    response = await client.get("/api/v1/admin/users")
    assert response.status_code == 401
