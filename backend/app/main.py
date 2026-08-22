from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from app.core.config import settings
from app.core.logging import setup_logging
from app.core.exceptions import triba_exception_handler, generic_exception_handler
from app.shared.responses import success
import uuid

setup_logging()


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield


app = FastAPI(
    title=settings.PROJECT_NAME,
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if settings.CORS_ORIGINS == "*" else settings.CORS_ORIGINS.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def add_request_id(request: Request, call_next):
    request.state.request_id = str(uuid.uuid4())
    response = await call_next(request)
    response.headers["X-Request-ID"] = request.state.request_id
    return response


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={
            "success": False,
            "error_code": "VALIDATION_ERROR",
            "message": "Invalid request data",
            "details": exc.errors(),
        },
    )


app.add_exception_handler(Exception, generic_exception_handler)

from app.modules.auth.router import router as auth_router
from app.modules.users.router import router as users_router
from app.modules.profiles.router import router as profiles_router
from app.modules.posts.router import router as posts_router
from app.modules.comments.router import router as comments_router
from app.modules.likes.router import router as likes_router
from app.modules.follows.router import router as follows_router
from app.modules.feed.router import router as feed_router
from app.modules.search.router import router as search_router
from app.modules.notifications.router import router as notifications_router
from app.modules.activity.router import router as activity_router
from app.modules.analytics.router import router as analytics_router
from app.modules.trends.router import router as trends_router
from app.modules.ai.router import router as ai_router
from app.modules.admin.router import router as admin_router

app.include_router(auth_router, prefix=settings.API_V1_PREFIX)
app.include_router(users_router, prefix=settings.API_V1_PREFIX)
app.include_router(profiles_router, prefix=settings.API_V1_PREFIX)
app.include_router(posts_router, prefix=settings.API_V1_PREFIX)
app.include_router(comments_router, prefix=settings.API_V1_PREFIX)
app.include_router(likes_router, prefix=settings.API_V1_PREFIX)
app.include_router(follows_router, prefix=settings.API_V1_PREFIX)
app.include_router(feed_router, prefix=settings.API_V1_PREFIX)
app.include_router(search_router, prefix=settings.API_V1_PREFIX)
app.include_router(notifications_router, prefix=settings.API_V1_PREFIX)
app.include_router(activity_router, prefix=settings.API_V1_PREFIX)
app.include_router(analytics_router, prefix=settings.API_V1_PREFIX)
app.include_router(trends_router, prefix=settings.API_V1_PREFIX)
app.include_router(ai_router, prefix=settings.API_V1_PREFIX)
app.include_router(admin_router, prefix=settings.API_V1_PREFIX)


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.get("/health/ready")
async def readiness():
    return {"status": "ready"}
