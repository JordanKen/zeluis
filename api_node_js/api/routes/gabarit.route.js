var express = require('express');
var gabarit = express.Router();
const auth = require("../middleware/Auth/auth.middleware");

// Require controller modules.
var garage_controller = require('../controllers/gabarit.controller');
const upload = require("../../upload").uploads;

var runUplaod = upload.fields([{
    name: 'avatar',
    maxCount: 1
}])



//Get a list of all merchants
gabarit.post('/',runUplaod ,garage_controller.SaveGabarit);
gabarit.get('/', garage_controller.getAllGabarit);

module.exports = gabarit;
