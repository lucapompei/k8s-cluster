# Introduction

The swagger aggregator gathers the swaggers exposed by all K8S services using their internal routes, therefore there is no need for those ones to expose them via public routes.

It's a db-less solution and it's able to automatically recognize the existing services in K8S.

## Dependencies

The application is based on the following libraries:

- @kubernetes/client-node: ^0.16.1
- body-parser: ^1.19.1
- express: ^4.17.2
- request: ^2.88.2
- swagger-ui-expresst: ^4.3.0

## Skaffold instructions

Aftering installing (and configuring) Minikube and Skaffold, start them using the following commands:

```
minikube start
minikube addons enable ingress
minikube tunnel
skaffold run
```

## Constraint

All services that want to share their swagger must expose it at http://${service-name}/v3/api-docs.