const express = require('express');
const router = express.Router()

const {db} = require('../data/MYSQL')

router.get('/list', (req,res) => { 
    db.query('SELECT * FROM orders', (err,result) => {
     res.json({
      "data":result,
      "message":"in orders table is empty "
     })
   })
 }) 

module.exports = router