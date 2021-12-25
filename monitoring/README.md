# Introduction

The folder allows you to configure a dedicated namespace dedicated for monitoring and observability through the _Prometheus_ and _Grafana_ stack.

## First startup

After installation, it is necessary to configure the credentials of the administrator user who will be able to access _Grafana_. The required command is the following and will print out the password linked to the user with username _admin_:

```
kubectl get secret --namespace monitoring promstack-grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo
```

## Dashboard

To access the dashboard you need a port-forward of the running _Grafana_ pod, with the command:

```
kubectl get pods -n monitoring
kubectl port-forward POD_NAME -n monitoring 3000
```