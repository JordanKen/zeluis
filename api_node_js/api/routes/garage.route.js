var express = require('express');
var vehicule = express.Router();
const auth = require("../middleware/Auth/auth.middleware");

// Require controller modules.
var garage_controller = require('../controllers/garage.controller');
const upload = require("../../upload").uploads;

var runUplaod = upload.fields([{
    name: 'avatar',
    maxCount: 1
}])


//Get a list of all merchants
vehicule.post('/',runUplaod, garage_controller.SaveGarage);
vehicule.get('/', garage_controller.getAllGarage);

module.exports = vehicule;
