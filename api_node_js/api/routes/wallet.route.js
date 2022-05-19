var express = require('express');
var marque = express.Router();
var wallet_controller = require('../controllers/wallet.controller');
const upload = require("../../upload").uploads;
const auth = require("../middleware/Auth/auth.middleware");


//Get a list of all merchants
marque.post('/', auth.auth(),wallet_controller.SaveWallet);
marque.get('/',auth.auth(),  wallet_controller.getWalletOfUser);

module.exports = marque;
