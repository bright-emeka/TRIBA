from fastapi import Request, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel


class ErrorResponse(BaseModel):
    error_code: str
    message: str
    request_id: str | None = None


class TRIBAException(Exception):
    def __init__(self, error_code: str, message: str, status_code: int = status.HTTP_400_BAD_REQUEST):
        self.error_code = error_code
        self.message = message
        self.status_code = status_code


async def triba_exception_handler(request: Request, exc: TRIBAException) -> JSONResponse:
    return JSONResponse(
        status_code=exc.status_code,
        content=ErrorResponse(error_code=exc.error_code, message=exc.message).model_dump(),
    )


async def generic_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content=ErrorResponse(error_code="INTERNAL_ERROR", message="An unexpected error occurred").model_dump(),
    )
