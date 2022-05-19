var express = require('express');
var sale = express.Router();
var sale_controller = require('../controllers/sale.controller');


//Get a list of all merchants
sale.post('/', sale_controller.SaveSale);
sale.get('/',  sale_controller.getAllSale);
sale.get('/:id',  sale_controller.getOneSale);

module.exports = sale;
