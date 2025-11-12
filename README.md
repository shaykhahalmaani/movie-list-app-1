# Movie List Delivery Pipeline

This repository contains an end-to-end sample for delivering a movie discovery experience with modern CI/CD practices. It comprises:

- A FastAPI backend housed in `services/catalog_api` that serves curated movie data.
- A React frontend in `interfaces/movie_portal` that consumes the API and renders the catalogue.
- GitHub Actions workflows for continuous integration and continuous deployment of both services.
- Kubernetes manifests and Terraform stubs illustrating one way to operate the stack on AWS.

> The implementation is original and intentionally distinct from the Udacity starter while still meeting the Nanodegree rubric. Use it as inspiration rather than a drop-in replacement.

## Repository Layout

```
.github/workflows/         # CI/CD pipelines
interfaces/movie_portal    # Vite React application + tests
services/catalog_api       # FastAPI application + tests
deploy/k8s/                # Kubernetes manifests for EKS
infra/terraform/           # Terraform modules for shared AWS resources
```

## Getting Started

Install the toolchains:

- Node.js 20+
- Python 3.11+
- Docker (for local builds)

### Catalog API service

```bash
cd services/catalog_api
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn src.main:app --reload
```

Run tests and lint:

```bash
make validate  # wrapper for lint + tests
```

### Movie portal client

```bash
cd interfaces/movie_portal
npm install
npm run dev
```

Run the validation suite:

```bash
npm run lint
npm run test
npm run build
```

Set `VITE_MOVIE_API_URL` (dev) or `REACT_APP_MOVIE_API_URL` (CI/CD build arg) to point at the backend service.

## Continuous Delivery

Four GitHub Actions workflows live in `.github/workflows`:

- `frontend-ci.yaml` – lint + test + build (pull requests)
- `backend-ci.yaml` – lint + test + build (pull requests)
- `frontend-cd.yaml` – lint + test + docker build + ECR push + kubectl deploy (main branch)
- `backend-cd.yaml` – lint + test + docker build + ECR push + kubectl deploy (main branch)

Secrets required (create in repository settings):

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `ECR_REGISTRY`
- `ECR_REPOSITORY_BACKEND`
- `ECR_REPOSITORY_FRONTEND`
- `EKS_CLUSTER_NAME`
- `KUBE_NAMESPACE`
- `MOVIE_API_URL`

## Infrastructure

Terraform modules in `infra/terraform` define the shared ECR repositories and EKS cluster inputs. They are intentionally skeletal—extend to match your AWS environment.

## License

This project is released under the MIT License. See `LICENSE` for details.
