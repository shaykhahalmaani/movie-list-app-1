.PHONY: format lint test validate

format:
	black src tests
	isort src tests

lint:
	flake8 src tests

test:
	pytest

validate: lint test
