
const express = require('express')

const router = express.Router()

const {db} = require('../data/MYSQL')
const { userSchema } = require('../../model/users')



router.get('/list', (req,res) => { 
    db.query('SELECT * FROM users', (err,result) => {
    res.json({
     "data":result,
     "message":"in users table is empty "
    }) 
  })
}) 

/// for create users we need to Schema Validation

//router.post('/create' , (req,res) => {
 //const body = req.body
 //const Validation = userSchema.validate(body)
 //if(!Validation) throw err
  //let inserData = `INSERT TO users(user_name,firs_name,last_name,password,register_date)
  //VALUES ('${body.user_name}','${body.firs_name}','${body.last_name}','${body.password}','current_timestamp()')`
   //db.query(inserData, (err,result) => {
    // if (err) throw err
     //res.json({
      //"data": result,
      //"message": "user created success"
     //})
   //})
//})

/// bottom codes is not ready yet

router.get('/list', (req,res) => { 
    db.query('SELECT * FROM user_roles', (err,result) => {
     res.json({
      "data":result,
      "message":"in user_roles table is empty "
     })
   })
 }) 
 

 
router.get('/list', (req,res) => { 
    db.query('SELECT * FROM basket', (err,result) => {
     res.json({
      "data":result,
      "message":"in basket table is empty "
     })
   })
 })

router.get('/list', (req,res) => { 
    db.query('SELECT * FROM user_basket', (err,result) => {
     res.json({
      "data":result,
      "message":"in user_basket table is empty "
     })
   })
 })
 


 router.get('/list', (req,res) => { 
    db.query('SELECT * FROM order_detail', (err,result) => {
     res.json({
      "data":result,
      "message":"in order_detail table is empty "
     })
   })
 }) 
 

 
router.get('/list', (req,res) => { 
    db.query('SELECT * FROM discount', (err,result) => {
     res.json({
      "data":result,
      "message":"in discount table is empty "
     })
   })
 }) 
  
router.get('/list', (req,res) => { 
   db.query('SELECT * FROM payment', (err,result) => {
    res.json({
     "data":result,
     "message":"in payment table is empty "
    })
  })
}) 


module.exports = router
  





