# Terraform Bootstrap

This module provisions the minimum AWS resources required to support the movie delivery pipeline.

- Two Elastic Container Registry repositories for the catalog API and movie portal images.
- Outputs containing repository URLs to wire into GitHub Action secrets.

## Usage

```hcl
module "movie_pipeline" {
  source = "./infra/terraform"

  aws_region               = "us-east-1"
  backend_repository_name  = "catalog-api"
  frontend_repository_name = "movie-portal"
}
```

> Extend this module with networking and EKS cluster definitions to align with your environment.
