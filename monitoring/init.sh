#!/bin/bash

# Add repositories
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

# Create namespace
kubectl create namespace monitoring

# Install Prometheus+Grafana stack
helm install promstack prometheus-community/kube-prometheus-stack --namespace monitoring --version 25.1.0 -f prometheus.yaml

# Install Loki+Promtail stack
helm install loki grafana/loki-stack --namespace monitoring --version 2.5.0