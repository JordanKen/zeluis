const models = require('../../models');
const {Op} = require("sequelize");

const getAllPropositionOfSale = async (req, res) => {

    var propositions = await models.proposition.findAll({
        include:[models.user], where:{saleId: req.params.id}
    });
    res.status(200).send({status: true, response: propositions});
}

const SaveProposition = async (req, res, next) => {
    try {
        var proposition = {
            amount: req.body.amount,
            userId: req.body.userId,
            saleId: req.body.saleId,
            createdAt: Date(),
        }
        var enchere = await models.sale.findOne({
            where: {
                id: req.params.id
            }
        });
        if(enchere){
            if(req.body.amount > 10000){
                var finalPrize =  req.body.amount;
                await enchere.update({finalPrice: finalPrize}).then(
                    enchere => {
                        models.proposition.create(proposition)
                            .then(sale => {
                                res.status(200).json({status: true, reponse: {message: "proposition  successful create!", data: sale}})
                            })
                    });
            }
            else {
                res.status(201).json({status: true, reponse: {message: "Bid must be greater than 10000XAF!"}});
            }

        }

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

module.exports = {getAllPropositionOfSale, SaveProposition};
