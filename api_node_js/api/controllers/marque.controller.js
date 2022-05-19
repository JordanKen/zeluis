const models = require('../../models');
const {Op} = require("sequelize");

const getAllMarque = async (req, res) => {

    var marques =  await models.marque.findAll();
    res.status(200).send(marques);
}

const SaveMarque = async (req, res, next) => {
    const avatar = req.files && req.files['avatar'] ? req.files['avatar'][0].filename:null;
    console.log(avatar);
    try {
        var marque = {
            name: req.body.name,
            avatar: avatar
        }
        await models.marque.create(marque)
            .then(marque => {
                res.status(200).json({status: true, reponse: {message: "marque create successful !", data: marque}})
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

module.exports = {getAllMarque, SaveMarque};
