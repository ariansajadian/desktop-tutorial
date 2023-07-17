const express = require('express')

const mysql = require ('mysql')
const app = express()


const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
  password : ''

});

db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('mysql connected...')
});



app.get('/bingg',(req,res) => {
    let sql = "create database mysql";
    db.query(sql,(err,result) => {
    if(err) throw err;
    console.log(result);
    res.send('database created....')
    })
});
