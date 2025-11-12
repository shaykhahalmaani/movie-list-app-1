.PHONY: format lint test validate

format:
	black catalog_api tests
	isort catalog_api tests

lint:
	flake8 catalog_api tests

test:
	pytest

validate: lint test
