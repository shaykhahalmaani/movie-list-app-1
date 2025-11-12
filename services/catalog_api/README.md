# Backend Service

FastAPI application exposing `/movies` and `/health` endpoints.

## Commands

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn catalog_api.main:app --reload
```

### Validation

```bash
make lint
make test
```

### Docker

```bash
docker build -t movie-backend:dev .
docker run --rm -p 8080:8080 movie-backend:dev
```
