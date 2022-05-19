var express = require('express');
var marque = express.Router();
var review_controller = require('../controllers/review.controller');
const upload = require("../../upload").uploads;


//Get a list of all merchants
marque.post('/', review_controller.SaveReview);
marque.get('/:id',  review_controller.getReviewOfVehicule);

module.exports = marque;
