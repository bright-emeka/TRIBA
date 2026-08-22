"""
Integration tests for TRIBA.
Run with: pytest tests/
"""
import pytest

pytestmark = pytest.mark.integration

@pytest.mark.skip(reason="Requires running services")
def test_full_user_flow():
    """Test: register -> login -> create post -> like -> comment"""
    pass

@pytest.mark.skip(reason="Requires running services")
def test_ai_chat_flow():
    """Test: login -> open AI -> ask about activity"""
    pass

@pytest.mark.skip(reason="Requires running services")
def test_admin_moderation_flow():
    """Test: admin login -> inspect user -> moderate content"""
    pass
