const models = require('../../models');
const {Op} = require("sequelize");

const getAllGabarit = async (req, res) => {

    var gabarits =  await models.gabarit.findAll();
    res.status(200).send(gabarits);
}

const SaveGabarit = async (req, res, next) => {
    try {
        const avatar = req.files && req.files['avatar'] ? req.files['avatar'][0].filename:null;
        var gabarit = {
            name: req.body.name,
            avatar: avatar
        }
        await models.gabarit.create(gabarit)
            .then(gabarit => {
                res.status(200).json({status: true, reponse: {message: "gabarit create successful !", data: gabarit}})
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

module.exports = {getAllGabarit, SaveGabarit};
