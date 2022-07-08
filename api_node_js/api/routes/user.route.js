const express = require("express");
const users = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {check, validationResult} = require("express-validator");
const auth = require("../middleware/Auth/auth.middleware");
var models = require('../../models')

// Require controller modules.
var user_controller = require("../controllers/user.controller");

const upload = require("../../upload").uploads;

var runUplaod = upload.fields([{
    name: 'avatar',
    maxCount: 1
}])

users.get("/", async (req, res) => {
    // View all list user
    models.user.findAll()
        .then((user) => {
            if (user) {
                res.status(200).send({
                    status: true,
                    response: user,
                });
            } else {
                res
                    .status(400)
                    .json({status: false, error: "no user in nupay-api system"});
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({status: false, error: err});
        });
});

users.post("/login", async (req, res) => {
    console.log('login')
    models.user.findOne({
        where: {
            email: req.body.email,
        }
    })
        .then((user) => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const token = jwt.sign(
                        {user: user.dataValues.id},
                        process.env.JWT_KEY,
                        {
                            expiresIn: 144000,
                        }
                    );
                    res.status(200).send({
                        statut: true,
                        response: {
                            message:
                                "You are successfully Registered ! Please login to access your Profile !",
                            token: {
                                access_token: token,
                                expiresIn: 144000,
                                token_type: 'bearer'
                            }
                        },
                    });
                } else {
                    res.status(400).json({
                        status: false,
                        errorcode: 400,
                        error: "The username or password is incorrect",
                    });
                }
            } else {
                res.status(400).json({
                    status: false,
                    errorcode: 400,
                    error: "The username or password is incorrect",
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({status: false, errorcode: 400, error: err});
        });
});

users.post('/save', user_controller.saveUser);

users.post("/register",
    [
        check("email").isEmail().withMessage("Email Invalid"),
        check("email").notEmpty().withMessage("Fields Email is required"),
        check("name").notEmpty().withMessage("Fields first name is required"),
        check("surname").notEmpty().withMessage("Fields last name is required"),
        check("password").notEmpty().withMessage("Fields password is required"),
    ],
    runUplaod,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({status: false, errorcode: 422, errors: errors.array()});
        }
        const today = new Date();
        const userData = {
            firstname: req.body.name,
            lastname: req.body.surname,
            age: req.body.age,
            sexe: req.body.sexe,
            telephone: req.body.telephone,
            sexe: req.body.sexe,
            email: req.body.email,
            created_at: today,
            avatar: req.avatar,
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

                                const verification_token = jwt.sign(
                                    {user: user.dataValues.id},
                                    process.env.JWT_KEY,
                                    {
                                        expiresIn: "7d",
                                    }
                                );


                                res.status(200).send({
                                    status: true,
                                    response: {
                                        message:
                                            "You are successfully Registered ! Please login to access your Profile !",
                                        access_token: token,
                                        expiresIn: 144000,
                                        token_type: 'bearer',
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
);

users.get("/me", [auth.auth()], async (req, res) => {
    // View logged in user profile

    res.status(200).send({response: req.user});
});

users.get("/admin", [auth.auth()], async (req, res) => {
    res.status(200).send({response: req.isAdmin});
});

//update role user
users.put(
    "/role/update",
    [auth.auth(), auth.role("admin")],
    user_controller.updateRoleUser
);

//update profile user
users.post(
    "/profile/update",[auth.auth(),runUplaod] ,user_controller.updateProfileUser
);
// find one user by email, name or phonenumber
users.get(
    "/find",
    user_controller.findUser
);

// find all user who made one or more than one transaction with another user


//update password user
users.put(
    "/password/update",
    [auth.auth()],
    user_controller.updatePasswordUser
);

//forgot password user
users.post(
    "/password/forgot",
    [check("password").notEmpty().withMessage("Fields Password is required"),
        check("password_confirm").notEmpty().withMessage("Fields Confirm Password is required")],
    user_controller.resetPasswordUser
);


// Log user out of the application
users.get("/logout", [auth.auth()], user_controller.logoutUser);



// users.get('/profile', (req, res) => {
//   var decoded = jwt.verify(req.headers['authorization'], process.env.JWT_KEY)

//   User.findOne({
//     where: {
//       id: decoded.id
//     }
//   })
//     .then(user => {
//       if (user) {
//         res.json(user)
//       } else {
//         res.send('User does not exist')
//       }
//     })
//     .catch(err => {
//       res.send('error: ' + err)
//     })
// })

module.exports = users;
