# Architecture Notes

The deployment stack follows a deliberate split between the presentation tier and the API tier.

- **Movie portal** – React SPA located in `interfaces/movie_portal`, containerized via a multi-stage Docker build. Static assets are served by nginx.
- **Catalog API** – FastAPI application in `services/catalog_api`, packaged with Uvicorn/Gunicorn inside an Alpine image. The API returns curated movie data and health metrics.
- **Kubernetes** – Two deployments exposed by services. ConfigMaps provide environment variables for the frontend base URL. HorizontalPodAutoscaler definitions may be added later.
- **AWS** – Elastic Container Registry stores build artifacts; Elastic Kubernetes Service hosts the workloads. Terraform modules scaffold the registries and allow reuse.

CI checks run on every pull request to protect `main`, while CD deploys only after merges. Each workflow is isolated and uses reusable caching logic for faster turnaround.
