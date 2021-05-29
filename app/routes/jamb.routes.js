const controller = require('../controller/jamb.controller');

module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/jamb/create", controller.createJamb);

    app.post("/api/jamb/update", controller.updateJamb);

    app.get("/api/jamb/get/:page/:limit", controller.ReadJamb);

    app.get("/api/jamb/delete/:id", controller.deleteJamb);
}