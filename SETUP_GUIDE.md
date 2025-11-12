# Complete Setup Guide

This guide will walk you through setting up the entire Movie Application CI/CD pipeline from scratch.

## Prerequisites

Before you begin, ensure you have the following installed:

- **AWS CLI** (configured with credentials)
- **Terraform** (>= 1.3.9)
- **kubectl**
- **Git**
- **Docker** (optional, for local testing)
- **jq** (for JSON parsing in scripts)

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/77Fayy/movie-picture-pipeline-.git
cd movie-picture-pipeline-
```

### 2. Configure AWS Credentials

Make sure your AWS CLI is configured with appropriate credentials:

```bash
aws configure
```

You'll need an AWS account with permissions to create:
- VPC and networking resources
- EKS clusters
- ECR repositories
- IAM users and roles

### 3. Run Automated Setup (Recommended)

We provide an automated setup script that will:
- Initialize Terraform
- Create all AWS infrastructure
- Configure kubectl
- Create GitHub Action user credentials
- Set up EKS permissions

```bash
cd setup
chmod +x workspace-setup.sh
./workspace-setup.sh
```

Follow the prompts and **save the AWS credentials** that are displayed!

### 4. Manual Setup (Alternative)

If you prefer to set up manually:

#### 4.1 Create Infrastructure with Terraform

```bash
cd setup/terraform
terraform init
terraform plan
terraform apply
```

Save the outputs (ECR URLs, cluster name, etc.)

#### 4.2 Configure kubectl

```bash
aws eks update-kubeconfig --name cluster --region us-east-1
```

#### 4.3 Create Access Keys for GitHub Actions

```bash
aws iam create-access-key --user-name github-action-user
```

Save the `AccessKeyId` and `SecretAccessKey`

#### 4.4 Configure EKS Permissions

```bash
cd ../
chmod +x init.sh
./init.sh
```

### 5. Configure GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add the following secrets:

1. **AWS_ACCESS_KEY_ID**: The access key from step 3 or 4.3
2. **AWS_SECRET_ACCESS_KEY**: The secret key from step 3 or 4.3
3. **AWS_SESSION_TOKEN**: Your AWS session token (if using temporary credentials)
4. **REACT_APP_MOVIE_API_URL**: The backend API URL (add this after first backend deployment)

### 6. Push Code to GitHub

```bash
git add .
git commit -m "Initial project setup"
git push origin main
```

This will trigger the CD workflows!

### 7. Get Backend LoadBalancer URL

After the backend deploys, get its URL:

```bash
kubectl get services backend
```

Look for the `EXTERNAL-IP` column. It will be a LoadBalancer URL like:
```
a1234567890abc-123456789.us-east-1.elb.amazonaws.com
```

Use this URL (with `http://` prefix) as the `REACT_APP_MOVIE_API_URL` secret.

### 8. Update Frontend Configuration

1. Go to GitHub → Settings → Secrets
2. Add or update `REACT_APP_MOVIE_API_URL` with: `http://<BACKEND_EXTERNAL_IP>`
3. Manually trigger the frontend CD workflow or push a new commit

### 9. Access Your Applications

Get the LoadBalancer URLs for both services:

```bash
kubectl get services
```

Access the applications:
- **Backend API**: `http://<backend-external-ip>/movies`
- **Frontend**: `http://<frontend-external-ip>`

## Testing the CI/CD Pipeline

### Test CI Workflows (Pull Request)

1. Create a new branch:
   ```bash
   git checkout -b feature/test-ci
   ```

2. Make a small change (e.g., update README)

3. Push and create a pull request:
   ```bash
   git add .
   git commit -m "Test CI pipeline"
   git push origin feature/test-ci
   ```

4. Go to GitHub and create a PR from `feature/test-ci` to `main`

5. CI workflows should trigger automatically:
   - Backend CI: lint → test → build
   - Frontend CI: lint → test → build

### Test CD Workflows (Push to Main)

1. Merge your pull request to main

2. CD workflows should trigger automatically:
   - Backend CD: lint → test → build-and-deploy
   - Frontend CD: lint → test → build-and-deploy

3. Check deployment status:
   ```bash
   kubectl get pods
   kubectl get services
   ```

## Verification Checklist

- [ ] All 4 GitHub Actions workflows exist
- [ ] Backend CI workflow passes (lint, test, build)
- [ ] Frontend CI workflow passes (lint, test, build)
- [ ] Backend CD workflow passes (lint, test, build, deploy)
- [ ] Frontend CD workflow passes (lint, test, build, deploy)
- [ ] Backend API returns movie list at `/movies` endpoint
- [ ] Frontend displays movie list
- [ ] LoadBalancer services are accessible
- [ ] Kubernetes pods are running

## Troubleshooting

### Workflow Fails with AWS Credentials Error

- Verify GitHub secrets are set correctly
- Check AWS_SESSION_TOKEN is valid (it expires)
- Ensure IAM user has required permissions

### EKS Connection Issues

- Run: `aws eks update-kubeconfig --name cluster --region us-east-1`
- Verify cluster is active: `aws eks describe-cluster --name cluster --region us-east-1`

### Pods Not Starting

```bash
# Check pod status
kubectl get pods

# Check pod logs
kubectl logs <pod-name>

# Describe pod for events
kubectl describe pod <pod-name>
```

### LoadBalancer Not Creating

- Check security groups allow traffic
- Verify subnets are tagged correctly
- Wait 2-3 minutes for LoadBalancer provisioning

### Frontend Can't Connect to Backend

- Verify `REACT_APP_MOVIE_API_URL` secret is set correctly
- Check backend LoadBalancer is accessible
- Ensure backend service is running: `kubectl get services backend`

## Cleanup

To destroy all resources and avoid AWS charges:

```bash
cd setup/terraform
terraform destroy
```

**Warning**: This will delete everything including the EKS cluster and ECR repositories!

## Getting Help

- Check GitHub Actions logs for detailed error messages
- Review [AWS EKS Documentation](https://docs.aws.amazon.com/eks/)
- Check [Terraform AWS Provider Docs](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)

## Project Structure

```
.
├── .github/workflows/      # GitHub Actions CI/CD workflows
├── starter/
│   ├── backend/           # Python Flask backend
│   │   ├── movies/        # API endpoints
│   │   ├── k8s/          # Kubernetes configs
│   │   ├── Dockerfile
│   │   └── Pipfile
│   └── frontend/          # React frontend
│       ├── src/           # React components
│       ├── k8s/          # Kubernetes configs
│       ├── Dockerfile
│       └── package.json
├── setup/
│   ├── terraform/         # Infrastructure as Code
│   ├── init.sh           # EKS permission setup
│   └── workspace-setup.sh # Automated setup script
├── README.md
├── CI-CD-SETUP.md
└── SETUP_GUIDE.md (this file)
```

## Next Steps After Setup

1. Customize the movie list in `starter/backend/movies/resources.py`
2. Update frontend styling in `starter/frontend/src/App.css`
3. Add more test cases
4. Implement additional features
5. Configure monitoring and logging

Good luck with your project! 🚀

