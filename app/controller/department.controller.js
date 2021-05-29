const db = require('../model');
const Deparment = db.department;

//creating a new institution

exports.createDepartment = (req, res) => {
    Deparment.create({
        name: req.body.name,
        detail: req.body.detail,
        jambScoreRequirement: req.body.jambScoreRequirement,
        institutionId: req.body.institutionId
    }).then(institution => {
        res.status(200).send({
            success: true,
            result: institution,
            message: 'Department has been created successfully'
        })
    }).catch(err => {
        res.status(404).send({success: false, message: err.message})
    });
}

//read institution by name

exports.ReadDepartmentByName = (req, res) => {
    Deparment.findAndCountAll({
        where: {
            name: req.body.name
        }
    }).then(result => {
        res.status(200).send({result: result, success: true, message: 'department are listed below according to their names'})
    }).catch(err => {
        res.status(400).send({message:err.message, success: false})
    })
};
//read institution

exports.ReadDepartment = (req, res) => {
    let offset = parseInt(req.params.page) * parseInt(req.params.limit)
    Deparment.findAndCountAll({
        limit: parseInt(req.params.limit),
        offset: offset,
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(result => {
        res.status(200).send({result: result, success: true, message: 'Faculty are listed below'})
    }).catch(err => {
        res.status(400).send({message:err.message, success: false})
    })
}

//update institution

exports.updateDepartment = (req, res) => {
    Deparment.update({
        name: req.body.name,
        detail: req.body.detail,
        jambScoreRequirement: req.body.jambScoreRequirement,
        institutionId: req.body.institutionId
    },
    {
        where: {
            id: parseInt(req.body.id)
        }
    }).then(result => {
        res.status(200).send({result: result, success: true, message: 'faculty has been updated successfully'})
    }).catch(err => {
        res.status(400).send({message:err.message, success: false})
    })
}

//delete institution

exports.deleteDepartment = (req, res) =>{
    Deparment.destroy({
        where:{
            id: req.params.id
        }
    }).then(result => {
        res.status(200).send({result: result, success: true, message: 'Faculty has been deleted successfully'})
    }).catch(err => {
        res.status(400).send({message:err.message, success: false})
    })
}