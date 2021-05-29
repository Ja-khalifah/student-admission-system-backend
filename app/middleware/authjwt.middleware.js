const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../model');
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if(!token) {
        return res.status(403).send({
            message: 'No token provided!', success: false
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if(err) {
            return res.status(401).send({
                message : 'unauthorized!', success: false
            })
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        try{
            user.getRoles().then(roles => {
                for(let i = 0; i < roles.length; i++) {
                    if(roles[i].name === 'admin') {
                        next();
                        return;
                    }
                }

                res.status(403).send({
                    message: 'Require Admin Role!', success: false
                });
                return;
            });
        }catch(err){
            res.status(403).send({
                message: 'Admin could not be found!', success: false
            });
            return;
        }
    });
};

isUser = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        try{
            user.getRoles().then(roles => {
                for(let i = 0; i < roles.length; i++) {
                    if(roles[i].name === 'user') {
                        next();
                        return;
                    }
                }

                res.status(403).send({
                    message: 'Require User Role!', success: false
                });
                return;
            });
        }catch(err){
            res.status(403).send({
                message: 'User could not be found!', success: false
            });
            return;
        }
    });
};

isUserOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        try{
            user.getRoles().then(roles => {
                for(let i = 0; i < roles.length; i++){
                    if(roles[i].name === 'user') {
                        next();
                        return;
                    }
                    if(roles[i].name === 'admin') {
                        next();
                        return;
                    }
                }
                res.status(403).send({
                    message: 'Require User or Admin Role!', success: false
                });
            });
        }catch(err){
            res.status(403).send({
                message: 'Couldnt find User or Admin Role!', success: false
            });
            return;
        }
    });
}
const authJwt = {
    verifyToken: verifyToken,
    isAdmin : isAdmin,
    isUser : isUser,
    isUserOrAdmin : isUserOrAdmin
};
module.exports = authJwt;

