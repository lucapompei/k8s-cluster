# Introduction

This repository is a container of various utilities for managing a Kubernetes cluster, such as API Gateway management, monitoring and observability, log aggregation, swagger aggregation and more.

These can be tested on any Kubernetes engine or implementation, such as Minikube, GKE, AKS or EKS and more.

## Contents

Each folder contains the information necessary to make the various configurations, such as those relating to:

- [Kong](https://github.com/lucapompei/k8s-cluster/tree/master/kong)
- [Prometheus + Grafana + Loki + Promtail stack](https://github.com/lucapompei/k8s-cluster/tree/master/monitoring)
- [Swagger aggregator](https://github.com/lucapompei/k8s-cluster/tree/master/swagger-aggregator)
- [Jenkins CI/CD template](https://github.com/lucapompei/k8s-cluster/tree/master/jenkins-cicd)

## Observability example

![Kong official dashboard](https://raw.githubusercontent.com/lucapompei/k8s-cluster/master/examples/kong.png "Kong official dashboard")

![Prometheus stats](https://raw.githubusercontent.com/lucapompei/k8s-cluster/master/examples/prometheus.png "Prometheus stats")

## Log aggregator example

![Loki](https://raw.githubusercontent.com/lucapompei/k8s-cluster/master/examples/loki.png "Loki")