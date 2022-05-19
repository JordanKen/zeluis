var express = require('express');
var rapport = express.Router();
var rapport_controller = require('../controllers/rapport.controller');


//Get a list of all merchants
rapport.post('/', rapport_controller.SaveRapport);

module.exports = rapport;
