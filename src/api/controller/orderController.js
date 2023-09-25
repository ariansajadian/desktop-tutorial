const {Validate} = require('../service/inputService')
const {db} = require('../data/MYSQL');


const createOrder = async(req,res) => {
    const params = req?.params;
    db.query(`SELECT * FROM user_basket Where user_id = '${params.id}'`, (err,result) => {
        if(!result.length >= 1) {
            res.status(401).json({message: "you have not any item"})
        }else{
        db.query(`INSERT INTO orders ( user_id , order_date ) VALUES ('${params.id}' , current_timestamp() )`, (err,result) => {
          db.query(`SELECT * FROM orders `, (err,result)  => {
            console.log(result)
        }) 
    });
        }
    })
}     

//update ...

const orderList = async(req,res) => {
    const params = req?.params;
        db.query(`SELECT * FROM  orders WHERE user_id = ${params.id}`, (err,result) => {
           if (!result.length >= 1) {
            res.status(401).json({message : "not found"});
           } else {
            res.status(200).json({message : result});
        }
    })
}

const deleteOrder = async(req,res) => {
    const params = req?.params;
        db.query(`DELETE  FROM  orders WHERE user_id = ${params.id}`, (err,result) => {
           if (!result.length >= 1) {
            res.status(401).json({message : "not found"});
           } else {
            res.status(200).json({message : "Success"});
        }
    })

}
module.exports = {
    createOrder,
    orderList,
    deleteOrder
}   