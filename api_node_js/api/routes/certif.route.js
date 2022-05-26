var express = require('express');
var certif = express.Router();
const auth = require("../middleware/Auth/auth.middleware");
var certif_controller = require('../controllers/certif.controller');

certif.post('/', certif_controller.postCertif);

module.exports = certif;
