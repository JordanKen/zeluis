var express = require('express');
var vehicule = express.Router();
const auth = require("../middleware/Auth/auth.middleware");
const upload = require("../../upload").uploads;

var runUplaod = upload.fields([{
    name: 'avatar',
    maxCount: 1
}])

// Require controller modules.
var vehicule_controller = require('../controllers/vehicule.controller');


//Get a list of all merchants
vehicule.post('/', runUplaod ,vehicule_controller.SaveVehicule);
vehicule.get('/onsale',[auth.auth()], vehicule_controller.getAllVehiculesOnSale);
vehicule.get('/', vehicule_controller.getAllCar);
vehicule.get('/search', vehicule_controller.getAllCar);
vehicule.get('/:id', vehicule_controller.getOneCar);

module.exports = vehicule;
