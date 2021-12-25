#!/bin/bash

# Add repository
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm update

# Create namespace
kubectl create namespace monitoring

# Install Prometheus+Grafana stack
helm install promstack prometheus-community/kube-prometheus-stack --namespace monitoring --version 25.1.0 -f prometheus.yaml