const {Validate} = require('../service/inputService')
const {db} = require('../data/MYSQL')


const createCategories = async (req,res) => {
    const body = req?.body;
    const request = ["title","parent_id"]
    const validation = await Validate(body,request)
    if(!validation.res) {
        res.json({  
          "data": null,
          "message": "required"
        })
    } else {
        db.query(`SELECT * FROM categories WHERE id = '${body.title}'`, (err,result) => {
            
            if(!result.length >= 1) res.status(403).json({message: "not found"});
        db.query(`INSERT INTO categories ( title , parent_id ) VALUES ('${body.title}' , ${body?.parent_id})`, (err,result) => {
           if (!result.length >= 1) res.status(403).json({message: "not found"});
           res.status(200).json({message: "Success"});
        })
    })
  }
} 

const updateCategories = async(req,res) => {
    const body = req?.body;
    const params = req?.params;
    const request = ["title","parent_id"];
    const validation = await Validate(body,request);
    if(!validation.res) {
        res.json({  
          "data": null,
          "message": "required"
        });
    } else {
        db.query(`SELECT * FROM categories WHERE id = ${params.id}`, (err,result) => {
            
            if(!result.length >= 1) res.status(403).json({message: "not found"});
            
            db.query(`UPDATE categories SET title = '${body.title}' AND parent_id = ${body.parent_id} Where id = ${params.id}`, (err,result) => {
                res.status(200).json({message:"Success"});
            })
        })
    }
}

const getCategories = async (req,res) => {
    const params = req?.params;
    //Selecting by title category
    db.query(`SELECT * FROM categories Where title = '${params.title}' `, (err,result) => {
        if (!result.length >= 1) res.status(400).json({message: "not found"});
        res.status(200).json({data:result});
    })
}

const deleteCategories = async (req,res) => {
    const params = req?.params;
    db.query(`DELETE FROM categories Where id = ${params.id}`, (err,result) => {
        if (!result.length >= 1) res.status(400).json({message: "not found"});
        res.status(200).json({message:"Success"});
    })
}
module.exports = {
    createCategories,
    updateCategories,
    deleteCategories,
    getCategories
}