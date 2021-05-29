const controller = require('../controller/institutionCategory.controller');
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

    app.post("/api/institution-category/create",[
    authJwt.verifyToken,
    authJwt.isAdmin
    ], 
    controller.createInstitutionCategory);

    app.post("/api/institution-category/update",[
    authJwt.verifyToken,
    authJwt.isAdmin,
    ], 
    controller.updateInstitutionCategory);

    app.get("/api/institution-category/get/:page/:limit",controller.ReadInstitutionCategory);

    app.get("/api/institution-category/read/:name/:page/:limit",controller.ReadInstitutionByCategory);

    app.get("/api/institution-category/delete/:id",[
    authJwt.verifyToken,
    authJwt.isUserOrAdmin
    ], 
    controller.deleteInstitutionCategory);
}