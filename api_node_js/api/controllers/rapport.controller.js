const models = require('../../models');
const {Op} = require("sequelize");

const SaveRapport = async (req, res, next) => {
    try {
        var rapport = {
            moteur: req.body.moteur,
            carrosserie: req.body.carrosserie,
            amortisseur: req.body.amortisseur,
            etatGeneral: req.body.etatGeneral,
            description: req.body.description,
            vehiculeId: req.body.vehiculeId,
            createdAt: Date(),
        }
        await models.rapport.create(rapport)
            .then(rapport => {
                res.status(200).json({status: true, reponse: {message: "rapport create successful !", data: rapport}})
            })
            .catch(err => {
                res.status(400).json({status: false, error: err})
            });
    } catch (error) {
        res.status(401).json({status: false, error: error})
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

module.exports = {SaveRapport};
