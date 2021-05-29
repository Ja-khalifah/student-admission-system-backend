const controller = require('../controller/o-level.controller');

module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/o-level/create", controller.createOlevel);

    app.post("/api/o-level/update", controller.updateOlevel);

    app.get("/api/o-level/by-userid", controller.ReadOlevelByUserId);

    app.get("/api/o-level/delete/:id", controller.deleteOlevel);

}