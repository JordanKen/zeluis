const models = require('../../models');
const {Op} = require("sequelize");

const getorderOfVehicule = async (req, res) => {

    var order =  await models.order.findOne({
        where: {
            vehiculeId: req.body.vehiculeId,
            userId: req.body.userId
        }
    });
    res.status(200).send({status:true, response: order});
}

const Saveorder = async (req, res, next) => {
 
};

/*const getAllGarageVehicule = async (req, res, next) => {
    try {
        const VehiculesUsers = await models.vehicule.findAll({
            where: {id_user: req.params.user_id}, include: [models.vente, models.user]
        });


        res.status(200).send({
            status: true,
            response: VehiculesUsers
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({status: false, error: error})
    }
};*/

module.exports = {getorderOfVehicule, Saveorder};
