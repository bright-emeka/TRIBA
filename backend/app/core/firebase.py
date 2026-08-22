import firebase_admin
from firebase_admin import credentials, firestore, storage
from app.core.config import settings

_firebase_app = None
_db = None
_bucket = None


def get_firebase_app():
    global _firebase_app
    if _firebase_app is None:
        cred = credentials.Certificate(settings.GOOGLE_APPLICATION_CREDENTIALS)
        _firebase_app = firebase_admin.initialize_app(cred, {"storageBucket": settings.FIREBASE_STORAGE_BUCKET})
    return _firebase_app


def get_db() -> firestore.Client:
    global _db
    if _db is None:
        get_firebase_app()
        _db = firestore.client()
    return _db


def get_bucket():
    global _bucket
    if _bucket is None:
        get_firebase_app()
        _bucket = storage.bucket()
    return _bucket
