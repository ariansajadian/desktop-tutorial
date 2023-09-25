const {Validate} = require('../service/inputService');
const {db} = require('../data/MYSQL');

const createRoles = async (req,res) => {
    const body = req.body
    const request = ["title"];
    const validation = await Validate(body,request)
   if(!validation.res) {
     res.json({
       "data": null,
       "message": "required"
     })
    } else {
        db.query(`SELECT * FROM roles WHERE title = ${body.title}`, (err,result) => {
            if (!result.length >= 1) res.status(404).json({message : "not found"})

            db.query(`INSERT INTO roles WHERE title = '${body.title}'`, (err,result) => {
                res.status(200).json({message : "Success"});
            })
        })
  
    }   
}

const updateRoles = async (req,res) => {
    const body = req.body;
    const request = ["title"];
    const validation = await Validate(body,request)
   if(!validation.res) {
     res.json({
       "data": null,
       "message": "required"
     })
    } else {
        db.query(`SELECT * FROM roles WHERE title = '${body?.title}'`, (err,result) => {
            if (!result.length >= 1) res.status(404).json({message : "not found"})

            db.query(`UPDATE roles SET title = '${body?.detail}', price = ${body?.price} Where id = '${result[0].id}'`, (err,result) => {
                res.status(200).json({message : "Success"});
            })
        })
    }   
}


const rolesList = async (req,res) => {
     
    db.query(`SELECT * FROM roles `, (err,result) => {
        if (!result.length >= 1) res.status(404).json({message : "not found"})
        res.status(200).json({data : result, message : "Success"})


    })      
}

const deleteRoles = async (req,res) => {
    const params = req?.params;
    db.query(`DELETE  FROM roles Where id = '${params.id}'`, (err,result) => {
        if (!result.length >= 1) res.status(400).json({message: "not found"});
        res.json({message: "Success"})
    })

}

module.exports = {
    createRoles,
    updateRoles,
    rolesList,
    deleteRoles
}