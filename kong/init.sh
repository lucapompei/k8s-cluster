#!/bin/bash

# Add repository
helm repo add kong https://charts.konghq.com
helm repo update

# Create namespace
kubectl create namespace kong

# Install Kong
helm install kong kong/kong --namespace kong --set serviceMonitor.enabled=true --set serviceMonitor.labels.release=promstack

# Configure global K8S plugins
kubectl apply -f globalPlugins.yaml -n kong
