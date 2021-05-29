const controller = require('../controller/jambResult.controller');
const authJwt = require('../middleware/authjwt.middleware');

module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/jamb-result/create",[
    authJwt.verifyToken
    ], 
    controller.createJambResult);

    app.post("/api/jamb-result/update",[authJwt.verifyToken], 
    controller.updateJambResult);

    app.get("/api/jamb-result/by-userid",controller.ReadJambResultByUserId);

    app.get("/api/jamb-result/delete/:id",[authJwt.verifyToken], 
    controller.deleteJambResult);
}