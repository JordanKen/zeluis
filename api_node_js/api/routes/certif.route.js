var express = require('express');
var certif = express.Router();
const auth = require("../middleware/Auth/auth.middleware");
var garage_controller = require('../controllers/bidBelong.controller');

certif.post('/', garage_controller.getBidBelong);

module.exports = certif;
