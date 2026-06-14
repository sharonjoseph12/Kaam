"""Common schemas shared across the API."""

from pydantic import BaseModel


class MessageResponse(BaseModel):
    """Generic message response."""

    message: str


class PaginatedParams(BaseModel):
    """Pagination parameters."""

    skip: int = 0
    limit: int = 50
