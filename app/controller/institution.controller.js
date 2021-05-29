const db = require('../model');
const Institution = db.institution;

//creating a new institution

exports.createInstitution = (req, res) => {
    Institution.create({
        name: req.body.name,
        type: req.body.type,
        location: req.body.location
    }).then(institution => {
        res.status(200).send({
            success: true,
            result: institution,
            message: 'An institution has been created successfully'
        })
    }).catch(err => {
        res.status(404).send({success: false, message: err.message})
    });
}

//read institution by name

exports.ReadInstitutionByName = (req, res) => {
    Institution.findAndCountAll({
        where: {
            name: req.body.name
        }
    }).then(result => {
        res.status(200).send({result: result, success: true, message: 'institution are listed below according to their names'})
    }).catch(err => {
        res.status(400).send({message:err.message, success: false})
    })
};
//read institution

exports.ReadInstitution = (req, res) => {
    let offset = parseInt(req.params.page) * parseInt(req.params.limit)
    Institution.findAndCountAll({
        limit: parseInt(req.params.limit),
        offset: offset,
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(result => {
        res.status(200).send({result: result, success: true, message: 'Institution are listed below'})
    }).catch(err => {
        res.status(400).send({message:err.message, success: false})
    })
}

//update institution

exports.updateInstitution = (req, res) => {
    Institution.update({
        name: req.body.name,
        type: req.body.type,
        location: req.body.location
    },
    {
        where: {
            id: parseInt(req.body.id)
        }
    }).then(result => {
        res.status(200).send({result: result, success: true, message: 'institution has been updated successfully'})
    }).catch(err => {
        res.status(400).send({message:err.message, success: false})
    })
}

//delete institution

exports.deleteInstitution = (req, res) =>{
    Institution.destroy({
        where:{
            id: req.params.id
        }
    }).then(result => {
        res.status(200).send({result: result, success: true, message: 'institution has been deleted successfully'})
    }).catch(err => {
        res.status(400).send({message:err.message, success: false})
    })
}