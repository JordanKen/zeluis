const models = require('../../models');
const {Op} = require("sequelize");

const getAllGarage = async (req, res) => {

    var garage =  await models.garage.findAll();
    res.status(200).send(garage);
}

const SaveGarage = async (req, res, next) => {
    try {
        const avatar = req.files && req.files['avatar'] ? req.files['avatar'][0].filename:null;
        var garage = {
            name: req.body.name,
            avatar: avatar,
            openHour: req.body.openHour,
            lockHour: req.body.lockHour,
            description: req.body.description
        }
        await models.garage.create(garage)
            .then(user => {
                res.status(200).json({status: true, reponse: {message: "garage create successful !", data: user}})
            })
            .catch(err => {
                res.status(400).json({status: false, error: err})
            });
    } catch (error) {
        res.status(400).json({status: false, error: error})
    }
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

module.exports = {getAllGarage, SaveGarage};
