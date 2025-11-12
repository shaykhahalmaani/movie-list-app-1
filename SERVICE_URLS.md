# Service URLs - Post CD Workflow Deployment

This document provides the Frontend and Backend service URLs from the EKS cluster after successful CD workflow completion.

## Backend Service

**Backend API Endpoint:**
```
http://a9d857113367e4ac4ae106afa5269704-11869507.us-east-1.elb.amazonaws.com/movies
```

**Test Command:**
```bash
curl http://a9d857113367e4ac4ae106afa5269704-11869507.us-east-1.elb.amazonaws.com/movies
```

**Expected Response:**
```json
{
  "movies": [
    {"title": "Top Gun: Maverick", "id": "123"},
    {"title": "Sonic the Hedgehog", "id": "456"},
    {"title": "A Quiet Place", "id": "789"},
    {"title": "The Matrix", "id": "101"}
  ]
}
```

---

## Frontend Service

**Frontend Application URL:**
```
http://aba1d196d81fb457eafef8d876672028-1272001997.us-east-1.elb.amazonaws.com
```

**Access:** Open the URL in a web browser to see the movie list displayed.

---

## Verification

### Get Services from EKS Cluster

```bash
kubectl get services
```

**Output:**
```
NAME         TYPE           CLUSTER-IP       EXTERNAL-IP                                                               PORT(S)        AGE
backend      LoadBalancer   172.20.180.50    a9d857113367e4ac4ae106afa5269704-11869507.us-east-1.elb.amazonaws.com     80:30909/TCP   XX
frontend     LoadBalancer   172.20.175.247   aba1d196d81fb457eafef8d876672028-1272001997.us-east-1.elb.amazonaws.com   80:30855/TCP   XX
```

### Get Pods Status

```bash
kubectl get pods
```

**Output:**
```
NAME                        READY   STATUS    RESTARTS   AGE
backend-xxxxxxxxx-xxxxx     1/1     Running   0          XXm
frontend-xxxxxxxxx-xxxxx    1/1     Running   0          XXm
```

---

## Kustomize Implementation

The CD workflows now properly use `kustomize` to update the image references instead of rewriting the entire deployment manifest.

### Backend CD Workflow - Deploy Step:
```yaml
- name: Deploy to Kubernetes
  run: |
    cd k8s
    # Update image using kustomize
    kustomize edit set image backend=$ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
    # Apply using kustomize
    kustomize build . | kubectl apply -f -
    kubectl rollout status deployment/backend
```

### Frontend CD Workflow - Deploy Step:
```yaml
- name: Deploy to Kubernetes
  run: |
    cd k8s
    # Update image using kustomize
    kustomize edit set image frontend=$ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
    # Apply using kustomize
    kustomize build . | kubectl apply -f -
    kubectl rollout status deployment/frontend
```

---

## Infrastructure Details

- **EKS Cluster Name:** cluster
- **Region:** us-east-1
- **ECR Frontend Repository:** 513131891126.dkr.ecr.us-east-1.amazonaws.com/frontend
- **ECR Backend Repository:** 513131891126.dkr.ecr.us-east-1.amazonaws.com/backend

---

## GitHub Repository

**Repository URL:** https://github.com/77Fayy/movie-picture-pipeline-.git

---

*Last Updated: October 13, 2025*

