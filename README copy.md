# Screenshots

This directory contains screenshots demonstrating the successful deployment and operation of the Movie Application.

## Required Screenshots for Submission

Please add the following screenshots to this directory:

### 1. GitHub Actions Workflows
- `backend-ci-passing.png` - Backend CI workflow showing all jobs passing
- `backend-cd-passing.png` - Backend CD workflow showing successful deployment
- `frontend-ci-passing.png` - Frontend CI workflow showing all jobs passing
- `frontend-cd-passing.png` - Frontend CD workflow showing successful deployment
- `pull-request.png` - Pull request with CI checks passing

### 2. AWS Infrastructure
- `ecr-backend.png` - ECR repository showing backend Docker images
- `ecr-frontend.png` - ECR repository showing frontend Docker images
- `eks-cluster.png` - EKS cluster showing ACTIVE status
- `kubectl-pods.png` - Running pods in the cluster

### 3. Application Working
- `backend-api-response.png` - Backend API endpoint `/movies` returning JSON
- `frontend-working.png` - Frontend displaying the movie list
- `both-services-running.png` - kubectl get services showing both LoadBalancers

## How to Take Screenshots

### GitHub Actions
1. Go to your repository → Actions tab
2. Click on a successful workflow run
3. Take a screenshot showing all jobs passed (green checkmarks)

### AWS Resources
1. **ECR**: AWS Console → ECR → Repositories → Select repository → View images
2. **EKS**: AWS Console → EKS → Clusters → View cluster details
3. **kubectl**: Run commands in terminal:
   ```bash
   kubectl get pods
   kubectl get services
   kubectl get deployments
   ```

### Application URLs
1. Get LoadBalancer URLs: `kubectl get services`
2. Backend: Open `http://<BACKEND-LB-URL>/movies` in browser
3. Frontend: Open `http://<FRONTEND-LB-URL>` in browser
4. Take screenshots showing the movie list

## Screenshot Naming Convention

Use descriptive names:
- `YYYY-MM-DD-description.png`
- Example: `2025-10-12-backend-ci-passing.png`

## Tips

- Ensure screenshots are clear and readable
- Capture the entire relevant section (don't crop important information)
- Include timestamps when possible
- Show URLs in browser address bar
- For terminal screenshots, include the command prompt

