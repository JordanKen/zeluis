const axios = require('axios');
const models = require('../../models');
const {Op} = require("sequelize");

const postCertif = async (req, res) => {

    await axios.post("localhost:5000", {h_name:req.body.h_name,key:req.body.key,name:req.body.name,alt_names:req.body.alt_names,basic_contraints:req.body.basic_contraints,now:req.body.now,cert:req.body.cert,my_cert_pem:req.body.my_cert_pem,my_key_pem:req.body.my_key_pem}) .bidbelong.findOne({
        where: {userId: req.params.userId, saleId: req.params.saleId}
    });
    if(bidbelong){
        res.status(200).send({status: true, response: bidbelong});
    }else{
        res.status(302).send({status:false, text: "Not subscribe"})
    }

}


module.exports = {getBidBelong};
