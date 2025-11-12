import pytest
from fastapi.testclient import TestClient

from src.main import app


client = TestClient(app)


def test_health_endpoint_returns_ok_status():
    response = client.get("/health")
    assert response.status_code == 200
    payload = response.json()
    assert payload["status"] == "ok"
    assert "timestamp" in payload


def test_movies_endpoint_returns_seeded_catalogue():
    response = client.get("/movies")
    assert response.status_code == 200
    movies = response.json()
    assert isinstance(movies, list)
    assert {movie["id"] for movie in movies} == {"arrival", "moonlight", "past-lives"}


def test_movies_endpoint_returns_404_when_empty(monkeypatch):
    from src import main

    def _empty_list():
        return []

    monkeypatch.setattr(main.repository, "list_movies", _empty_list)
    response = client.get("/movies")
    assert response.status_code == 404
    assert response.json()["detail"] == "No movies available"
