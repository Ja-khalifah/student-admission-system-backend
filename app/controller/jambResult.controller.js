const db = require('../model');
const JambResult = db.jambResult;

//creating a new institution

exports.createJambResult = (req, res) => {
    JambResult.create({
        userId: req.userId,
        subjectId: req.body.subjectId,
        score: req.body.score,
        jambId: req.jambId
    }).then(institution => {
        res.status(200).send({
            success: true,
            result: institution,
            message: 'Jamb Result has been created successfully'
        })
    }).catch(err => {
        res.status(404).send({success: false, message: err.message})
    });
}

//read institution by name

exports.ReadJambResultByUserId = (req, res) => {
    JambResult.findAndCountAll({
        where: {
            userId: req.userId
        }
    }).then(result => {
        res.status(200).send({result: result, success: true, message: 'Jamb Result are listed below according to their names'})
    }).catch(err => {
        res.status(400).send({message:err.message, success: false})
    })
};


//update institution

exports.updateJambResult = (req, res) => {
    JambResult.update({
        userId: req.userId,
        subjectId: req.body.subjectId,
        score: req.body.score,
        jambId: req.jambId
    },
    {
        where: {
            id: parseInt(req.body.id)
        }
    }).then(result => {
        res.status(200).send({result: result, success: true, message: 'Jamb Result has been updated successfully'})
    }).catch(err => {
        res.status(400).send({message:err.message, success: false})
    })
}

//delete jamb result

exports.deleteJambResult = (req, res) =>{
    Institution.destroy({
        where:{
            id: req.params.id
        }
    }).then(result => {
        res.status(200).send({result: result, success: true, message: 'Jamb Result has been deleted successfully'})
    }).catch(err => {
        res.status(400).send({message:err.message, success: false})
    })
}