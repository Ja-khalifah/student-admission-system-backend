const { subject } = require('../model');
const db = require('../model');
const Subject = db.subject;

//creating a new subject

exports.createSubject = (req, res) => {
    Subject.create({
        name: req.body.subjectName,
        type: req.body.type
    }).then(subject => {
        res.status(200).send({
            success: true,
            result: subject,
            message: 'A subject has been created successfully'
        })
    }).catch(err => {
        res.status(404).send({success: false, message: err.message})
    });
}

//read subjects

exports.ReadSubject = (req, res) => {
    let offset = parseInt(req.params.subject) * parseInt(req.params.limit)
    Subject.findAndCountAll({
        limit: parseInt(req.params.limit),
        offset: offset,
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(result => {
        res.status(200).send({result: result, success: true, message: 'subjects are listed below'})
    }).catch(err => {
        res.status(400).send({message:err.message, success: false})
    })
}

exports.ReadSubjectByType = (req, res) => {
    let offset = parseInt(req.params.subject) * parseInt(req.params.limit)
    Subject.findAndCountAll({
        limit: parseInt(req.params.limit),
        offset: offset,
        order: [
            ['createdAt', 'DESC']
        ],
        where: {
            type: req.body.type
        }
    }).then(result => {
        res.status(200).send({result: result, success: true, message: 'subjects are listed below'})
    }).catch(err => {
        res.status(400).send({message:err.message, success: false})
    })
}

//read subject by subjectName

exports.ReadSubjectBySubjectName = (req, res) => {
    let offset = parseInt(req.params.subject) * parseInt(req.params.limit)
    Subject.findAndCountAll({
        limit: parseInt(req.params.limit),
        offset: offset,
        order: [
           [ 'createdAt', 'updatedAt']
        ],
        where: {
            subjectName: req.body.subjectName
        }
    }).then(result => {
        res.status(200).send({result: result, success: true, message: 'subjects are listed below according to their names'})
    }).catch(err => {
        res.status(400).send({message:err.message, success: false})
    })
};

//update subject

exports.updateSubject = (req, res) => {
    Subject.update({
        subjectName: req.body.subjectName,
        description: req.body.description
    },
    {
        where: {
            id: parseInt(req.body.id)
        }
    }).then(result => {
        res.status(200).send({result: result, success: true, message: 'subject has been updated successfully'})
    }).catch(err => {
        res.status(400).send({message:err.message, success: false})
    })
}

//delete subject

exports.deleteSubject = (req, res) =>{
    Subject.destroy({
        where:{
            id: req.params.id
        }
    }).then(result => {
        res.status(200).send({result: result, success: true, message: 'subject has been deleted successfully'})
    }).catch(err => {
        res.status(400).send({message:err.message, success: false})
    })
}