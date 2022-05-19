var express = require('express');
var bidBelong = express.Router();
const auth = require("../middleware/Auth/auth.middleware");
var garage_controller = require('../controllers/bidBelong.controller');

bidBelong.get('/:userId/:saleId', garage_controller.getBidBelong);

module.exports = bidBelong;
