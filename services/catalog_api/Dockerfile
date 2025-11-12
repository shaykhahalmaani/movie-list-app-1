# syntax=docker/dockerfile:1.6

FROM python:3.11-slim AS base
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /svc
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY catalog_api ./catalog_api

CMD ["uvicorn", "catalog_api.main:app", "--host", "0.0.0.0", "--port", "8080"]
