const jwt = require("jsonwebtoken");
const config = require("../config/auth/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
    let bearerToken = req.headers["authorization"];

    const token = bearerToken.split(' ')[1];

    console.log(token)

    if (!token) {
        return res.status(403).send({message: "No token provided!"});
    }

    jwt.verify(token,
        config.secret,
        (err, decoded) => {
            if (err) {
                console.log(err)
                return res.status(401).send({
                    message: "Unauthorized!",
                });
            }
            req.userId = decoded.id;
            next();
        });
};

isAdmin = (req, res, next) => {
    console.log(res.userId)
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }

        Role.findById(user.role, (err, role) => {
                if (err) {
                    res.status(500).send({message: err});
                    return;
                }

                if (role.name == "admin") {
                    next();
                    return;
                }

                res.status(403).send({message: "Require Admin Role!"});
                return;
            }
        );
    });
};

isUser = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        console.log(user)
        if (err) {
            res.status(500).send({message: err});
            return;
        }

        if (user) {
            // req.userId = user.id;
            next();
            return;
        }
        else {
            res.status(403).send({message: "you do not allow to create a book"})
        }

    });
};

isModerator = (req, res, next) => {
    console.log(req.userId)
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            console.log(err)
            res.status(500).send({message: err});
            return;
        }

        Role.findById(user.role, (err, role) => {
                if (err) {
                    res.status(500).send({message: err});
                    return;
                }

                if (role.name == "moderator") {
                    next();
                    return;
                }

                res.status(403).send({message: "Require Moderator Role!"});
                return;
            }
        );
    });
};

const authJwt = {
    verifyToken,
    isAdmin,
    isUser,
    isModerator,
};
module.exports = authJwt;