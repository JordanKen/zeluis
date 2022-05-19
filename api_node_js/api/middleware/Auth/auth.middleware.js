const jwt = require("jsonwebtoken");
const models = require("../../../models");

const auth = function () {
    return async (req, res, next) => {
        let token;
        if (req.header("Authorization")) {
            token = req.header("Authorization").replace("Bearer ", "");
            console.log(token);
        } else {
            res.status(200).send({status: false, error: "Not authorized to access this resource verified header"});
        }
        try {
            let permission = "Not Permission"
            console.log(token);
            const data = jwt.verify(token, process.env.JWT_KEY);
            const user = await models.user.findOne({
                where: {id: data.user}
            });

            if (!user) {

                throw new Error();
            }
            req.user = {user};
            if(user.isAdmin == 1){
                req.isAdmin = true;
            }else {
                req.isAdmin = false;
            }
            req.token = token;

            next();
        } catch (error) {
            res.status(200).send({status: false, error: "Not authorized to access this resource"});
        }
    };
};


const role = function (role_user) {
    return async (req, res, next) => {
        let token;
        if (req.header("Authorization")) {
            token = req.header("Authorization").replace("Bearer ", "");
        } else {
            res
                .status(401)
                .send({
                    status: false,
                    error: "Not authorized to access this resource verified header",
                });
        }
        try {
            const data = jwt.verify(token, process.env.JWT_KEY);
            const user = await User.findOne({where: {id: data.user}, include: [Role]});


            if (role_user == user.role.name) {
                req.user = user;
                req.token = token;
                next();
            } else {
                res
                    .status(401)
                    .send({
                        status: false,
                        error: "User Not have role to access this resource",
                    });
            }
        } catch (error) {
            res.status(401).send({status: false, error: "User Not have role to access this resource"});
        }
    };
};


const permission = function (permissions = []) {
    return async (req, res, next) => {
        const token = req.header("Authorization").replace("Bearer ", "");

        const data = jwt.verify(token, process.env.JWT_KEY);
        const user_permissions = await User_Permissions.findAll({
            where: {
                user_id: data.user,
                feature: permissions[0],
                capability: permissions[1]
            }, raw: true
        });


        if (user_permissions.length) {

            req.user = user_permissions;
            req.token = token;
            next();
        }
        res
            .status(401)
            .send({
                status: false,
                error: "User Not have permission to access this resource",
            });


    };
};

module.exports = {auth, role, permission};


// const auth = async function () {
//   const user = await User.findOne({ where: { id: 1},include:[Role],raw:true, });
// console.log(user);
// };
// auth();
