const db = require('../model');
const Faculty = db.faculty;

//creating a new institution

exports.createFaculty = (req, res) => {
    Faculty.create({
        name: req.body.name,
        detail: req.body.detail
    }).then(institution => {
        res.status(200).send({
            success: true,
            result: institution,
            message: 'Faculty has been created successfully'
        })
    }).catch(err => {
        res.status(404).send({success: false, message: err.message})
    });
}

//read institution by name

exports.ReadFacultyByName = (req, res) => {
    Faculty.findAndCountAll({
        where: {
            name: req.body.name
        }
    }).then(result => {
        res.status(200).send({result: result, success: true, message: 'faculty are listed below according to their names'})
    }).catch(err => {
        res.status(400).send({message:err.message, success: false})
    })
};
//read institution

exports.ReadFaculty = (req, res) => {
    let offset = parseInt(req.params.page) * parseInt(req.params.limit)
    Faculty.findAndCountAll({
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

exports.updateFaculty = (req, res) => {
    Faculty.update({
        name: req.body.name,
        faculty: req.body.faculty
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

exports.deleteFaculty = (req, res) =>{
    Faculty.destroy({
        where:{
            id: req.params.id
        }
    }).then(result => {
        res.status(200).send({result: result, success: true, message: 'Faculty has been deleted successfully'})
    }).catch(err => {
        res.status(400).send({message:err.message, success: false})
    })
}