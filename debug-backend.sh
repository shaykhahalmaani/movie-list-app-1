#!/bin/bash
echo "🔍 Backend Debugging Script"
echo "======================================"
echo ""

echo "1. Checking if backend pod exists:"
kubectl get pods -l app=backend
echo ""

echo "2. Checking backend deployment:"
kubectl get deployment backend
echo ""

echo "3. Checking backend service:"
kubectl get service backend
echo ""

echo "4. Checking pod details:"
kubectl describe pod -l app=backend
echo ""

echo "5. Checking pod logs:"
kubectl logs -l app=backend --tail=50
echo ""

echo "6. Checking service endpoints:"
kubectl get endpoints backend
echo ""

