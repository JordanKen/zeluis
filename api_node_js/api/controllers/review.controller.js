const models = require('../../models');
const {Op} = require("sequelize");

const getReviewOfVehicule = async (req, res) => {

    var reviews =  await models.review.findAll({
        where: {
            vehiculeId: req.params.id
        }
    });
    res.status(200).send(reviews);
}

const SaveReview = async (req, res, next) => {
    try {
        var review = {
            userId: req.body.userId,
            titre: req.body.titre,
            description: req.body.description,
            note: req.body.note,
            vehiculeId: req.body.vehiculeId,
        }
        await models.review.create(review)
            .then(marque => {
                res.status(200).json({status: true, reponse: {message: "review create successful !", data: marque}})
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

module.exports = {getReviewOfVehicule, SaveReview};
