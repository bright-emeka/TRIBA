import uuid
import re
from typing import Optional


def generate_id() -> str:
    return str(uuid.uuid4())


def is_valid_username(username: str) -> bool:
    if not username or len(username) < 3 or len(username) > 30:
        return False
    return bool(re.match(r"^[a-zA-Z0-9_]+$", username))


def is_valid_email(email: str) -> bool:
    pattern = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
    return bool(re.match(pattern, email))
