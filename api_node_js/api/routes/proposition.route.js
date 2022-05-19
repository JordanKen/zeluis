var express = require('express');
var proposition = express.Router();
var proposition_controller = require('../controllers/proposition.controller');


//Get a list of all merchants
proposition.post('/:id', proposition_controller.SaveProposition);
proposition.get('/:id',  proposition_controller.getAllPropositionOfSale);

module.exports = proposition;
