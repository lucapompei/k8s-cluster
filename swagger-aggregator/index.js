// Define requirements
const express = require("express");
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerClient = require('./swaggerClient');

// Define constants
const app = express();
const port = 3000;

// Configure app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Expose health root
app.get('/', (req, res) => res.send("Ok"));

// Route forwarding service swaggers
app.get(
    '/swaggers/:service',
    async (req, res) => {
        const service = req.params.service;
        console.log(`Requesting for swagger of ${service}`);
        const swagger = await swaggerClient.getServiceSwaggerUrl(service);
        res.setHeader('Content-type', 'application/json');
        res.send(swagger);
    }
);

//Expose swaggers with definition selection
app.use(
    '/swagger-ui/',
    async (req, res, next) => {
        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.log(`Requesting for swaggers ${fullUrl}`);
        const options = await swaggerClient.buildSwaggerOptions();
        req.options = options;
        swaggerUi.setup(null, options);
        next();
    },
    swaggerUi.serve,
    swaggerUi.setup(null, {
        explorer: true
    })
);

// Starts server
app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
});
