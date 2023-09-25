const {Validate} = require('../service/inputService');
const {db} = require('../data/MYSQL');


const createOrderDetail = async(req,res,next) => {
    const params = req?.params;
     /** db.query(`SELECT * FROM order_detail WHERE product_id AND order_id = ${params.id}  `, (err,result) => {
        console.log(result)
        next()
    } )*/
    let sql = `INSERT INTO order_detail (order_id, product_id, quantity, price) 
                  SELECT  ${params.id}, ub.product_id, ub.quantity, p.price FROM user_basket AS ub 
                  INNER JOIN products AS p ON ub.product_id = p.id`;   

    db.query(sql, (err,result) => {
      db.query(`SELECT * FROM order_detail `, (err,result) => {
        console.log(result)
        next()
      })
   })
}
const deleteUserBasket = async (req,res,next) => {
    createOrderDetail(req,res, () => {
        db.query(`SELECT * FROM user_basket`, (err,result) => {
            db.query(`DELETE  FROM user_basket Where user_id = '${result[0].user_id}' AND product_id > 0  `, (err,result) => {    
             res.json({data: null,message: "data in user_basket is deleted"})
             next()
            })
        })   
    })
}


module.exports = {createOrderDetail, deleteUserBasket}