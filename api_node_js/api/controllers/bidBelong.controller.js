const models = require('../../models');
const {Op} = require("sequelize");

const getBidBelong = async (req, res) => {

    var bidbelong = await models.bidbelong.findOne({
        where: {userId: req.params.userId, saleId: req.params.saleId}
    });
    if(bidbelong){
        res.status(200).send({status: true, response: bidbelong});
    }else{
        res.status(302).send({status:false, text: "Not subscribe"})
    }

}


module.exports = {getBidBelong};
