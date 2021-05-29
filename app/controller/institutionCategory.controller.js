const db = require('../model');
const InstitutionCategory = db.institutionCategory;

//creating a new institution

exports.createInstitutionCategory = (req, res) => {
    InstitutionCategory.create({
        name: req.body.name,
        description: req.body.description
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

exports.ReadInstitutionByCategory = (req, res) => {
    InstitutionCategory.findAndCountAll({
        where: {
            name: req.body.name
        }
    }).then(result => {
        res.status(200).send({result: result, success: true, message: 'institution category are listed below according to their names'})
    }).catch(err => {
        res.status(400).send({message:err.message, success: false})
    })
};
//read institution

exports.ReadInstitutionCategory = (req, res) => {
    let offset = parseInt(req.params.page) * parseInt(req.params.limit)
    InstitutionCategory.findAndCountAll({
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

exports.updateInstitutionCategory = (req, res) => {
    InstitutionCategory.update({
        name: req.body.name,
        description: req.body.description
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

exports.deleteInstitutionCategory = (req, res) =>{
    InstitutionCategory.destroy({
        where:{
            id: req.params.id
        }
    }).then(result => {
        res.status(200).send({result: result, success: true, message: 'institution has been deleted successfully'})
    }).catch(err => {
        res.status(400).send({message:err.message, success: false})
    })
}