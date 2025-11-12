"""FastAPI application providing movie catalogue endpoints."""

from __future__ import annotations

from datetime import datetime
from typing import List

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from .repository import MovieRepository, get_repository


class Movie(BaseModel):
    id: str
    title: str
    synopsis: str
    poster_url: str
    year: int
    rating: float


class HealthPayload(BaseModel):
    status: str
    timestamp: datetime


app = FastAPI(title="Movie Pipeline API", version="1.0.0")
repository = get_repository()


@app.get("/health", response_model=HealthPayload)
async def health_check() -> HealthPayload:
    """Return service uptime info."""
    return HealthPayload(status="ok", timestamp=datetime.utcnow())


@app.get("/movies", response_model=List[Movie])
async def list_movies() -> List[Movie]:
    """Return the curated list of movies."""
    movies = repository.list_movies()
    if not movies:
        raise HTTPException(status_code=404, detail="No movies available")
    return [Movie(**movie.dict()) for movie in movies]
