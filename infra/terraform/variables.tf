variable "aws_region" {
  description = "AWS region for infrastructure resources"
  type        = string
  default     = "us-east-1"
}

variable "backend_repository_name" {
  description = "ECR repository name for the catalog api"
  type        = string
  default     = "movie-catalog-api"
}

variable "frontend_repository_name" {
  description = "ECR repository name for the movie portal"
  type        = string
  default     = "movie-portal-web"
}
