/**
 * Created by bthiru on 11/5/2016.
 */
var express = require('express');
var app = express();
var productService = require('./productService');
var inventoryServices = require('./inventoryServices');
var pricingServices = require('./pricingServices');
var userServices = require('./userServices');


app.get('/product/:id', productService.findById);
app.get('/price/:id', pricingServices.findById);
app.get('/inventory/:id', inventoryServices.findById);
app.get('/authenticate', userServices.authenticate);

app.listen(8080);
console.log('Listening on port 8080...');