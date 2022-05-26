const axios = require('axios');
const models = require('../../models');
const {Op} = require("sequelize");

const postCertif = async (req, res) => {
    console.log(req.body.h_name)

    await axios.post("http://localhost:5000/post_json", {h_name:req.body.h_name}).then(
        result => {
            res.status(200).send({status: true, response: result.data}); 
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

module.exports = {postCertif};