var express = require('express');
var marque = express.Router();
var order_controller = require('../controllers/order.controller');
const upload = require("../../upload").uploads;


//Get a list of all merchants
marque.post('/', order_controller.Saveorder);
marque.get('/',  order_controller.getorderOfVehicule);

module.exports = marque;
