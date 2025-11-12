output "regional_registry_ids" {
  description = "Map of repository names to registry IDs"
  value = {
    backend  = aws_ecr_repository.catalog.registry_id
    frontend = aws_ecr_repository.portal.registry_id
  }
}
