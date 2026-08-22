from typing import Dict, Any
import firebase_admin
from firebase_admin import auth
from app.core.config import settings
from jose import jwt, JWTError


def verify_firebase_token(token: str) -> Dict[str, Any]:
    try:
        decoded = auth.verify_id_token(token)
        return decoded
    except firebase_admin.auth.InvalidIdTokenError:
        raise ValueError("Invalid token")
    except firebase_admin.auth.ExpiredIdTokenError:
        raise ValueError("Expired token")
    except Exception as e:
        raise ValueError(f"Token verification failed: {str(e)}")


def create_access_token(data: Dict[str, Any]) -> str:
    to_encode = data.copy()
    return jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
