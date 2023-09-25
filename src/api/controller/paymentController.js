const {Validate} = require('../service/inputService');
const {db} = require('../data/MYSQL');


const createPayment =  (req,res) => {
    const params = req?.params;
    let sql = `select id, persent into @id, @persent  from  discount where  
    active_date <= date(now()) and expire_date >= date(now()); `

    db.query(sql, (err,result) => {
      let finalSql =  `INSERT INTO payment (order_id,discount_id,total_price,discount_price,total_amount,payment_type,payment_date, payment_code)
      SELECT 2, @id, price, price * @persent / 100, price - price * @persent / 100, 
      1, date(now()), '2121121' FROM(
      SELECT SUM(price * quantity) as price FROM order_detail Where order_id = 2  
      GROUP BY order_id) as orderDetail;`
        db.query(finalSql, (err,result) => {
            db.query(`SELECT * FROM payment WHERE id = ${result.insertId}`, (err,result) => {
                res.status(200).json({data: result ,message: "Success"})
            })
        })
    })  
}  

//update ...

const paymentList = async(req,res) => {
    const params = req?.params;

    db.query(`SELECT * FROM paymnet WHERE id  = '${params.id}' `, (err,result) => {
       if (!result.length >= 1) {
        res.status(401).json({message : "not found"});
       }
        res.status(200).json({date : result});
   })
}

const deletepayment = async(req,res) => {
    const params = req?.params;

    db.query(`DELETE  FROM paymnet WHERE id  = '${params.id}' `, (err,result) => {
       if (!result.length >= 1) {
        res.status(401).json({message : "not found"});
       }
        res.status(200).json({date : result});
   })
}
            

module.exports  = {
    createPayment,
    paymentList,
    deletepayment
}



