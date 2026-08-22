from typing import Any
from fastapi.responses import JSONResponse
from pydantic import BaseModel


class SuccessResponse(BaseModel):
    success: bool = True
    data: Any = None


class ErrorResponse(BaseModel):
    success: bool = False
    error_code: str
    message: str


def success(data: Any = None, status_code: int = 200) -> JSONResponse:
    return JSONResponse(content={"success": True, "data": data}, status_code=status_code)


def error(error_code: str, message: str, status_code: int = 400) -> JSONResponse:
    return JSONResponse(content={"success": False, "error_code": error_code, "message": message}, status_code=status_code)
