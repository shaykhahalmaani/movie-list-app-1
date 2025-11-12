# CI/CD Pipeline Setup for Movie Application

This project contains GitHub Actions workflows for Continuous Integration (CI) and Continuous Deployment (CD) of both frontend and backend applications.

## Workflows Overview

### Frontend Workflows

#### 1. Frontend Continuous Integration (`frontend-ci.yaml`)

- **Triggers**: Pull requests to main branch, manual dispatch
- **Jobs**:
  - `lint`: Runs ESLint on the React application
  - `test`: Runs Jest tests
  - `build`: Builds Docker image (runs after lint and test pass)

#### 2. Frontend Continuous Deployment (`frontend-cd.yaml`)

- **Triggers**: Push to main branch, manual dispatch
- **Jobs**:
  - `lint`: Runs ESLint
  - `test`: Runs Jest tests
  - `build-and-deploy`: Builds Docker image with build args, pushes to ECR, deploys to EKS

### Backend Workflows

#### 3. Backend Continuous Integration (`backend-ci.yaml`)

- **Triggers**: Pull requests to main branch, manual dispatch
- **Jobs**:
  - `lint`: Runs Flake8 linting
  - `test`: Runs pytest tests
  - `build`: Builds Docker image (runs after lint and test pass)

#### 4. Backend Continuous Deployment (`backend-cd.yaml`)

- **Triggers**: Push to main branch, manual dispatch
- **Jobs**:
  - `lint`: Runs Flake8 linting
  - `test`: Runs pytest tests
  - `build-and-deploy`: Builds Docker image, pushes to ECR, deploys to EKS

## Required GitHub Secrets

To use these workflows, you need to configure the following secrets in your GitHub repository:

1. `AWS_ACCESS_KEY_ID` - AWS access key for ECR and EKS access
2. `AWS_SECRET_ACCESS_KEY` - AWS secret key for ECR and EKS access
3. `REACT_APP_MOVIE_API_URL` - Environment variable for the frontend to connect to the backend API

## AWS Prerequisites

Before running the CD pipelines, ensure you have:

1. **ECR Repositories**: Create repositories named `frontend` and `backend`
2. **EKS Cluster**: A cluster named `cluster` in `us-east-1` region
3. **IAM Permissions**: The AWS credentials should have permissions for:
   - ECR: Push/pull images
   - EKS: Update kubeconfig and deploy applications

## ECR Repository Setup

Create ECR repositories for both applications:

```bash
# Create frontend repository
aws ecr create-repository --repository-name frontend --region us-east-1

# Create backend repository
aws ecr create-repository --repository-name backend --region us-east-1
```

## Kubernetes Deployment

The workflows automatically update the Kubernetes deployment files to use the ECR images with the commit SHA as the tag. The deployment files are located in:

- Frontend: `starter/frontend/k8s/deployment.yaml`
- Backend: `starter/backend/k8s/deployment.yaml`

## Testing the Workflows

### Manual Testing

1. Go to the Actions tab in your GitHub repository
2. Select any workflow
3. Click "Run workflow" to trigger manually

### Pull Request Testing

1. Create a pull request to the main branch
2. The CI workflows will automatically run
3. Check the Actions tab to see the results

### Deployment Testing

1. Merge a pull request to the main branch
2. The CD workflows will automatically deploy to EKS
3. Verify the applications are running in your cluster

## Verification Steps

After deployment, verify that:

1. **Frontend Application**:

   - Accessible via the frontend service URL
   - Can fetch and display the list of movies
   - Environment variable `REACT_APP_MOVIE_API_URL` is correctly set

2. **Backend Application**:
   - API endpoints are accessible
   - Returns the list of movies when called
   - Properly connected to the frontend

## Troubleshooting

### Common Issues

1. **ECR Login Failures**: Verify AWS credentials and ECR repository existence
2. **EKS Deployment Failures**: Check cluster name and region configuration
3. **Build Failures**: Ensure all dependencies are properly installed
4. **Test Failures**: Check that all tests pass locally before pushing

### Logs and Debugging

- Check the Actions tab in GitHub for detailed logs
- Use `kubectl logs` to check application logs in the cluster
- Verify ECR images are pushed successfully
- Check EKS cluster status and pod health

## Security Notes

- AWS credentials are stored as GitHub Secrets (never hardcoded)
- ECR login uses official AWS actions
- All sensitive data is properly secured
- No AWS credentials are exposed in the workflow files

