const User = require("../../models/user");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const {Model} = require("sequelize");
const {validationResult} = require("express-validator");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const models = require('../../models');

const updateRoleUser = async (req, res, next) => {
    try {
        const user = await User.findOne({where: {id: req.body.user_id}});

        user.update({role_id: req.body.role_id});

        res.status(200).json({status: true, response: `Role User update successful !`});
    } catch (error) {
        res.status(400).json({status: false, error: error});
    }
};

const blockedOrUnblockedUser = async (req, res, next) => {
    try {
        const user = await User.findOne({where: {id: req.body.user_id}});

        user.update({is_active: req.body.is_active});

        res.status(200).json({status: true, response: `update successful !`});
    } catch (error) {
        console.log(error);
        res.status(400).json({status: false, error: error});
    }
};


const verificationUser = async (req, res, next) => {
    try {
        const data = await jwt.verify(req.query.token, process.env.JWT_KEY);
        if (data.user) {
            const user = await User.findOne({where: {id: data.user}});
            user.update({verification_email: 1});
            res.status(200).json({status: true, response: `user verify email successful !`});

        } else {
            res.status(400).json({status: false, error: `token user verify email expire !`});

        }

    } catch (error) {
        console.log(error);
        res.status(400).json({status: false, error: error});
    }
};


const updateProfileUser = async (req, res, next) => {
    try {
        const avatar = req.files && req.files['avatar'] ? req.files['avatar'][0].filename:null;
        const user = await models.user.findOne({where: {id: req.user.user.id}});

        user.update({
            name: req.body.name,
            age: req.body.age,
            sexe: req.body.sexe,
            telephone: req.body.telephone,
            avatar: avatar,
        });
        res.status(200).json({status: true, response: `update profile successful !`});
    } catch (error) {
        console.log(error);
        console.log(req.user.id);
        req.user
        res.status(400).json({status: false, error: error});
    }
};


const findUser = async (req, res, next) => {
    try {
        var word = req.query.word;
        const user = await User.findOne(
            {
                where: {
                    [Op.or]: [
                        {
                            first_name: {[Op.like]:'%'+word+'%'}
                        },
                        {
                            last_name: {[Op.like]:'%'+word+'%'}
                        },
                        {
                            email:
                                {
                                    [Op.like]:'%'+word+'%'
                                }
                        },
                        {
                            phonenumber:
                                {
                                    [Op.like]:'%'+word+'%'
                                }
                        }
                    ]
                }
            }
        );

        res.status(200).json({status: true, response: user});
    } catch (error) {
        console.log(error);
        req.user
        res.status(400).json({status: false, error: error});
    }
};


const updatePasswordUser = async (req, res, next) => {
    try {
        const user = await User.findOne({where: {id: req.body.user_id}});

        if (bcrypt.compareSync(req.body.password, user.password)) {
            bcrypt.hash(req.body.new_password, 10, (err, hash) => {
                user.update({
                    password: hash,
                });
            })

            res.status(200).json({status: true, response: `password is change successful !`});
        } else {
            res.status(400).json({
                status: false,
                error: "Your current password is missing or incorrect; it's required to change the Password"
            });
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({status: false, error: error});
    }
};


const logoutUser = async(req, res, next) => {
    try {
        res.setHeader("Authorization","");
        res.status(200).send({status:true})
    } catch (error) {
        console.log(error)
        res.status(400).send({status: false, error: error})
    }
};




const saveUser= async (req, res, next) => {

        const today = new Date();
        const userData = {
            name: req.body.name,
            surname: req.body.surname,
            age: req.body.age,
            sexe: req.body.sexe,
            telephone: req.body.telephone,
            sexe: req.body.sexe,
            email: req.body.email,
            created_at: today,
            avatar: req.originalUrl.split("/")[4] + "_" + req.body.email + ".jpg",
        };
        models.user.findOne({
            where: {
                email: req.body.email,
            }
        })
            // bcrypt hash password
            .then((user) => {
                if (!user) {
                    console.log(user);
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        userData.password = hash;

                        models.user.create(userData)
                            .then((user) => {
                                const token = jwt.sign(
                                    {user: user.dataValues.id},
                                    process.env.JWT_KEY,
                                    {
                                        expiresIn: 144000,
                                    }
                                );


                                res.status(200).send({
                                    status: true,
                                    response: {
                                        message:
                                            "User successfully Registered!",
                                    },
                                });
                            })
                            .catch((err) => {
                                console.log(err);
                                res.send({status: false, error: err});
                            });
                    });
                } else {
                    res.status(401).send({status: false, errorcode: 400, error: "User already exists"});
                }
            })
            .catch((err) => {
                res.status(402).send({status: false, error: err});
            });

}


const resetPasswordUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({status: false, errorcode: 422, errors: errors.array()});
        }


        const data = await jwt.verify(req.query.token, process.env.JWT_KEY);
        if (data.user) {
            const user = await User.findOne({where: {id: data.user}});
            if (req.body.password === req.body.password_confirm) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    user.update({password: hash});
                    res.status(200).json({status: true, response: `user password reset successful !`});


                });

            } else {
                res.status(400).json({status: false, response: `Password and confirm password does not match !`});

            }

        } else {
            res.status(400).json({status: false, error: `token user verify email expire !`});

        }

    } catch (error) {
        console.log(error);
        res.status(400).json({status: false, error: error});
    }
};


module.exports = {
    updateRoleUser,
    resetPasswordUser,
    blockedOrUnblockedUser,
    updateProfileUser,
    updatePasswordUser,
    verificationUser,
    logoutUser,findUser, saveUser
};

