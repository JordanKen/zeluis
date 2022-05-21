const axios = require('axios');
const models = require('../../models');
const {Op} = require("sequelize");

const postCertif = async (req, res) => {

    await axios.post("localhost:5000", {h_name:req.body.h_name}) .bidbelong.findOne({
        where: {userId: req.params.userId, saleId: req.params.saleId}
    });
    if(bidbelong){
        res.status(200).send({status: true, response: bidbelong});
    }else{
        res.status(302).send({status:false, text: "Not subscribe"})
    }

}


module.exports = {postCertif};
