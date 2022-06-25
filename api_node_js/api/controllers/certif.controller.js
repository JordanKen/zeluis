const axios = require('axios');
const models = require('../../models');
const {Op, UUID} = require("sequelize");

const postCertif = async (req, res) => {
    console.log(req.body.h_name)

    await axios.post("http://localhost:5000/post_json", {h_name:req.body.h_name}).then(
        result => {
            if(result.data){
                console.log(result.data)
                try {
                    let certificate = {
                        subject_name:result.data.subject_name,
                        ca_name:result.data.issuer_name,
                        version:result.data.version,
                        serial_num: Math.random(),
                        algo_hash:result.data.hash,
                        validity_begin:result.data.start_date,
                        validity_end:result.data.expiration_date,
                        public_key:result.data.my_cert_pem,
                        private_key:result.data.my_key_pem,
                        type:"SSL",
                        user_id:req.body.user_id
                    }
                    models.certificate.create(certificate)
                        .then(result => {
                            res.status(200).json({status: true, reponse: {message: "certificate create successful !", data: result}})
                        })
                        .catch(err => {
                            res.status(400).json({status: false, error: err})
                        });
                } catch (error) {
                    res.status(400).json({status: false, error: error})
                }
            }else {
                res.status(500).send({status:false, text:"Error encountered"})
            }

        }
    );
    /*
    if(bidbelong){
        res.status(200).send({status: true, response: bidbelong});
    }else{
        res.status(302).send({status:false, text: "Not subscribe"})
    }
*/
}

const getUserCertificate = async (req, res) => {
    console.log(req.query.user_id)
    try {
        await models.certificate.findAll({where: {
            user_id:req.query.user_id
        }}).then(result => {
                res.status(200).json({status: true, reponse: {message: "List of user certificates", data: result}})
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({status: false, error: err})
            });
    } catch (error) {
        console.log(error)
        res.status(400).json({status: false, error: error})
    }
}

module.exports = {postCertif, getUserCertificate};

/*subject_name: DataTypes.STRING,
    ca_name: DataTypes.STRING,
    version: DataTypes.STRING,
    serial_num: DataTypes.STRING,
    algo_sign: DataTypes.STRING,
    algo_hash: DataTypes.STRING,
    validity_begin: DataTypes.DATE,
    validity_end: DataTypes.DATE,
    public_key: DataTypes.STRING,
    private_key: DataTypes.STRING,
    type: DataTypes.STRING,
    parameter_pk: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    payment_id: DataTypes.INTEGER,*/