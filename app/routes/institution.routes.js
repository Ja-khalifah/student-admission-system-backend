const controller = require('../controller/institution.controller');
const authJwt = require('../middleware/authjwt.middleware');
const verifySignUp = require('../middleware/verifysignup.middleware');

module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/institution/create",[
    authJwt.verifyToken,
    authJwt.isAdmin,
    verifySignUp.checkDuplicateInstitutionName
    ], 
    controller.createInstitution);

    app.post("/api/institution/update",[
    authJwt.verifyToken,
    authJwt.isAdmin,
    verifySignUp.checkUpdateDuplicateInstitutionName
    ], 
    controller.updateInstitution);

    app.get("/api/institution/get/:page/:limit",controller.ReadInstitution);

    app.get("/api/institution/read/:name",controller.ReadInstitutionByName);

    app.get("/api/institution/delete/:id",[
    authJwt.verifyToken,
    authJwt.isUserOrAdmin
    ], 
    controller.deleteInstitution);
}