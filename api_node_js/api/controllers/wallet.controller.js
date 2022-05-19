const models = require('../../models');
const {Op} = require("sequelize");

const getWalletOfUser = async (req, res) => {

    var wallet = await models.wallet.findOne({
        where: {
            userId: req.user.user.id
        }
    });
    res.status(200).send({status: true, response: wallet});
}

const SaveWallet = async (req, res, next) => {
    try {
        var arrive = {
            userId: req.user.user.id,
            amount: req.body.amount
        }

        var wallet = await models.wallet.findOne({
            where: {
                userId: req.user.user.id
            }
        });
        if (wallet) {
            var newAmount = wallet.amount + req.body.amount;
            console.log(newAmount)
            await wallet.update({amount: newAmount})
                .then(wallet => {
                    res.status(200).json({status: true, reponse: {message: "wallet successful update!", data: wallet}})
                })
        } else {
            await models.wallet.create(arrive)
                .then(wallet => {
                    res.status(200).json({status: true, reponse: {message: "wallet successful create!", data: wallet}})
                })
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

module.exports = {SaveWallet, getWalletOfUser};
