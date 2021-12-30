// Define requirements
const k8s = require('@kubernetes/client-node');
const request = require('request');

// Define contants
const route = process.env.route != null ? process.env.route : '';
const namespace = process.env.namespace != null ? process.env.namespace : 'default';
const exclusions = ['kubernetes', 'swagger-aggregator'];

// Configure client
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

// Get services inside the given namespace
function getServices() {
    return new Promise((resolve, reject) => {
        k8sApi.listNamespacedService(namespace)
            .then(res => {
                const services = res.body.items.map(item => item?.metadata?.name);
                console.log(`Retrieved list of services from K8S: ${services}`);
                resolve(services);
            })
            .catch(err => {
                console.error(`Unable to get the list of services from K8S`, err);
                resolve([]);
            });
    });
}

// Retrieve service swagger
function getServiceSwaggerUrl(service) {
    return new Promise((resolve, reject) => {
        const options = {
            'method': 'GET',
            'url': `http://${service}/v2/api-docs`
        };
        console.log(`Getting Swagger from ${options.url}`);
        request(options, function (error, response) {
            if (error) {
                console.error(`Unable to get Swagger for ${service}`, error);
                resolve({});
            } else {
                console.log(`Retrieved Swagger for ${service}`);
                resolve(response.body);
            }
        });

    });
}

// Build swagger options managing all services
async function buildSwaggerOptions() {
    const options = {
        swaggerOptions: {
            urls: []
        }
    };
    const services = await getServices();
    for (service of services) {
        if (!exclusions.includes(service)) {
            options.swaggerOptions.urls.push({
                url: `${route}/swaggers/${service}`,
                name: service
            });
        }
    }
    console.log('Swagger options built', JSON.stringify(options));
    return options;
}

module.exports = { getServiceSwaggerUrl, buildSwaggerOptions };