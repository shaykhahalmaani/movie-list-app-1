"""In-memory data access layer.

Designed to be easily swappable for a database implementation later."""

from __future__ import annotations

from dataclasses import dataclass
from typing import List


@dataclass
class MovieRecord:
    id: str
    title: str
    synopsis: str
    poster_url: str
    year: int
    rating: float


class MovieRepository:
    def __init__(self, seed: List[MovieRecord] | None = None) -> None:
        self._records = seed or []

    def list_movies(self) -> List[MovieRecord]:
        return list(self._records)


def get_repository() -> MovieRepository:
    seed_data = [
        MovieRecord(
            id="arrival",
            title="Arrival",
            synopsis="A linguist is recruited to communicate with extraterrestrial visitors.",
            poster_url="https://images.example.com/arrival.jpg",
            year=2016,
            rating=7.9,
        ),
        MovieRecord(
            id="moonlight",
            title="Moonlight",
            synopsis="Coming-of-age tale following Chiron through three acts of his life.",
            poster_url="https://images.example.com/moonlight.jpg",
            year=2016,
            rating=7.4,
        ),
        MovieRecord(
            id="past-lives",
            title="Past Lives",
            synopsis="Two childhood friends reunite decades later to reconcile the past.",
            poster_url="https://images.example.com/past-lives.jpg",
            year=2023,
            rating=8.1,
        ),
    ]
    return MovieRepository(seed_data)
