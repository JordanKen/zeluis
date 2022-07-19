const axios = require('axios');
const models = require('../../models');
const {Op, UUID} = require("sequelize");
const JSZip = require("jszip")

const postCertif = async (req, res) => {
    console.log(req.body)

    await axios.post("http://localhost:5000/post_json", {subject_name:req.body.subject_name}).then(
        result => {
            if(result.data){
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
                             console.log(err)
                            res.status(400).json({status: false, error: err})
                        });
                } catch (error) {
                    console.log(error)
                    res.status(400).json({status: false, error: error})
                }
            }else {
                res.status(500).send({status:false, text:"Error encountered"})
            }

        }
    );
}

const getUserCertificate = async (req, res) => {
    console.log(req.query.user_id)
    if(req.query.user_id){
        
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
    else{
        
    try {
        await models.certificate.findAll().then(result => {
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
}


const deleteCertificate = async (req, res) => {
    console.log(req.query.id)
    try {
        await models.certificate.destroy({where: {
            id:req.query.id
        }}).then(result => {
                res.status(200).json({status: true, reponse: {message: "Certification deleted" }})
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



const downloadCertificate = async (req, res) => {
    const zip = new JSZip()
    try {
        await models.certificate.findOne({where: {
            id:req.query.id
        }}).then(result => {
                if(result){
                    console.log(result.public_key)
                    zip.file(
                        "certificate.crt",
                        result.public_key
                    )

                    zip.file(
                        "private.key",
                        result.private_key
                    )
                    zip.generateAsync()
                }
                res.status(200).json({status: true, response: {data: zip}})
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

module.exports = {postCertif, getUserCertificate, deleteCertificate, downloadCertificate};
