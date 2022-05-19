var express = require('express');
var marque = express.Router();
const auth = require("../middleware/Auth/auth.middleware");

// Require controller modules.
var garage_controller = require('../controllers/marque.controller');
const upload = require("../../upload").uploads;

var runUplaod = upload.fields([{
    name: 'avatar',
    maxCount: 1
}])


//Get a list of all merchants
marque.post('/', runUplaod, garage_controller.SaveMarque);
marque.get('/',  garage_controller.getAllMarque);

module.exports = marque;
