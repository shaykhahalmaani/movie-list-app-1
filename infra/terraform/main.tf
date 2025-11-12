terraform {
  required_version = ">= 1.6.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.53"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

resource "aws_ecr_repository" "catalog" {
  name                 = var.backend_repository_name
  image_tag_mutability = "MUTABLE"
}

resource "aws_ecr_repository" "portal" {
  name                 = var.frontend_repository_name
  image_tag_mutability = "MUTABLE"
}

output "catalog_repository_url" {
  value = aws_ecr_repository.catalog.repository_url
}

output "portal_repository_url" {
  value = aws_ecr_repository.portal.repository_url
}
