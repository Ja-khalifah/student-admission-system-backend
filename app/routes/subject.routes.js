const controller = require('../controller/subject.controller');

module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/subject/create", controller.createSubject);

    app.post("/api/subject/update", controller.updateSubject);

    app.get("/api/subject/get/:subject/:limit", controller.ReadSubject);

    app.get("/api/subject/delete/:id", controller.deleteSubject);
    
    app.get("/api/subject/read/:subject/:limit/:subject", controller.ReadSubjectBySubjectName)

}