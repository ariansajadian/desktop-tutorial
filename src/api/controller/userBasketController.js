const {Validate} = require('../service/inputService');
const {db} = require('../data/MYSQL');


const createUserBasket = async(req,res) => {
    const body = req?.body;
    const params = req?.params
    const request = ["product_id","quantity"]
    const validation = await Validate(body,request)
    if(!validation.res) {
        res.json({  
          "data": null,
          "message": "required"
        })
    } else{
        db.query(`INSERT INTO user_basket (user_id, product_id, quantity) VALUES ('${params.id}', ${body.product_id}, ${body.quantity})`, (err,result) => {
            if(err) {
            res.status(401).json({message: "not found"})
          } else {  
            db.query(`SELECT * FROM user_basket`, (err,result) => {
                res.status(200).json({data: result})
            })        
            
        }             
         
     })
          
    }
}

const  updateCart = async (req,res) => {
    const body = req?.body
    const params = req?.params
    const query = req?.query
    const request = ["quantity"]
    const validation = await Validate(body,request)
    if(!validation.res) {
        res.json({  
          "data": null,
          "message": "required"
        })
    } else{
        db.query(`UPDATE user_basket SET quantity = ${body.quantity} WHERE user_id = '${params.id}' AND product_id = ${query.q}`, (err,result) => {
            if(err) {
            res.status(401).json({message: "not found"})
          } else {  
            db.query(`SELECT * FROM user_basket`, (err,result) => {
                res.status(200).json({data: result})
            })        
            
        }             
         
     })
          
    }
    
    
}


const deleteitems = async (req,res) => {
    const query = req?.query
    db.query(`DELETE  FROM user_basket Where product_id = ${query.q}`, (err,result) => {
        res.json({message: "Success"})
    })
}

module.exports = {
    createUserBasket, 
    deleteitems,
    updateCart

} 