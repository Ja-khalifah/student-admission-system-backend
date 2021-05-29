const db = require('../model');
const Jamb = db.jamb;

//creating a new Jamb

exports.createJamb = (req, res) => {
    if(req.body.active){
        Jamb.findOne({
            where: {
                active: true
            }
        }).then(jambResult => {
            if(jambRresult){
                jambResult.active = false;
                jambResult.save();
            }
        })
    }
    Jamb.create({
        description: req.body.description,
        session: req.body.session,
        active: !req.body.active ? false : true
    }).then(jamb => {
        res.status(200).send({
            success: true,
            result: jamb,
            message: 'A Jamb session has been created successfully'
        })
    }).catch(err => {
        res.status(404).send({success: false, message: err.message})
    });
}

//read jambs

exports.ReadJamb = (req, res) => {
    let offset = parseInt(req.params.page) * parseInt(req.params.limit)
    Jamb.findAndCountAll({
        limit: parseInt(req.params.limit),
        offset: offset,
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(result => {
        res.status(200).send({result: result, success: true, message: 'jamb session are listed below'})
    }).catch(err => {
        res.status(400).send({message:err.message, success: false})
    })
}

//update Jamb
exports.updateJamb = (req, res) => {
    Jamb.update({
        session: req.body.session,
        description: req.body.description
    },
    {
        where: {
            id: parseInt(req.body.id)
        }
    }).then(result => {
        res.status(200).send({result: result, success: true, message: 'grade has been updated successfully'})
    }).catch(err => {
        res.status(400).send({message:err.message, success: false})
    })
}

//delete Jamb

exports.deleteJamb = (req, res) =>{
    Jamb.destroy({
        where:{
            id: req.params.id
        }
    }).then(result => {
        res.status(200).send({result: result, success: true, message: 'jamb score has been deleted successfully'})
    }).catch(err => {
        res.status(400).send({message:err.message, success: false})
    })
}