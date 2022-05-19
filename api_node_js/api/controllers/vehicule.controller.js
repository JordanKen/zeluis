const models = require('../../models');
const {Op} = require("sequelize");


const getAllVehiculesOnSale = async (req, res, next) => {
    try {
        const Vehicules = await models.vehicule.findAll({
            include: [models.user, models.vente], where: {
                end_date: {
                    [Op.gt]: Date()
                }
            }
        });
        res.status(200).send({
            status: true,
            response: Vehicules
        })
    } catch (error) {
        res.status(400).json({status: false, error: error})
    }
};

const searchCar = async (req, res) => {

    var vehicules = await models.vehicule.findAll({
        include: [models.marque, models.garage, models.gabarit, models.user],
        where:{

        }
    });
    console.log(vehicules);
    res.status(200).send({status: true, response: vehicules});
}

const getAllCar = async (req, res) => {
    //var limit = parseInt(req.query.limit);
    //var offset = parseInt(req.query.offset);
    //var order = req.query.order;

    var vehicules = await models.vehicule.findAll({
    include: [models.marque, models.garage, models.gabarit, models.user]
    });
    console.log(vehicules);
    res.status(200).send({status: true, response: vehicules});
}

const getOneCar = async (req, res) => {
    //var limit = parseInt(req.query.limit);
    //var offset = parseInt(req.query.offset);
    //var order = req.query.order;

    var vehicule = await models.vehicule.findOne({
        where: {id: req.params.id}, include: [models.marque, models.garage, models.gabarit, models.user]
    });
    res.status(200).send({status: true, response: vehicule});
}

const SaveVehicule = async (req, res, next) => {
    const avatar = req.files && req.files['avatar'] ? req.files['avatar'][0].filename : '';
    console.log(avatar);
    try {
        var vehicule = {
            name: req.body.name,
            marqueId: req.body.marqueId,
            gabaritId: req.body.gabaritId,
            garageId: req.body.garageId,
            manufacturateYear: req.body.manufacturateYear,
            mileage: req.body.mileage,
            price: req.body.price,
            color: req.body.color,
            avatar: avatar,
            userId: req.body.userId
        }
        models.vehicule.create(vehicule)
            .then(user => {
                console.log(user);
                res.status(200).json({status: true, reponse: {message: "vehicule", data: user}})
            })
            .catch(err => {
                res.status(400).json({status: false, error: err})
            });
    } catch (error) {
        res.status(400).json({status: false, error: error})
    }
};


const UpdateVehicule = async (req, res, next) => {
    try {
        var vehicule = {
            id: req.id,
            name: req.body.name,
            brand: req.body.brand,
            manufacturateYear: req.body.manufacturateYear,
            mileage: req.body.mileage,
            price: req.body.price,
            id_user: req.body.id_user

        }
        models.vehicule.save(vehicule)
            .then(user => {
                res.status(200).json({status: true, reponse: {message: "categorie create successful !", data: user}})
            })
            .catch(err => {
                res.status(400).json({status: false, error: err})
            });
    } catch (error) {
        res.status(400).json({status: false, error: error})
    }
};


const getAllVehiculesSpecificUser = async (req, res, next) => {
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
};

module.exports = {getAllVehiculesOnSale, SaveVehicule, UpdateVehicule, getAllCar, getOneCar};
