
const express = require('express');
const bodyParser = require("body-parser");
const {getData} = require('./crudOperation')
//const mysql = require('mysql');
//const {Validation} = require('./InputValidation')

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extends:true}));

const {schemaValidate} =require('./InputService') 

const connectDB = require('./MYSQL');
connectDB.db
connectDB.connection


app.get('/api/v1/users/list', (req, res) => {
  const getuser = getData('users');
  res.json({
    "data":"result"
  })    
})


app.post('/api/v1/users/create', (req, res) => {
  // validate request body
  const body = req?.body;
  const ValidateForm =  schemaValidate.validate(body)
  
  if (!ValidateForm?.res) {
    res.json({
      "data": null,
      "message": "required"
    });

  } else {
    let FindUser =`SELECT * FROM users Where user_name = '${body?.user_name}'`;
    connectDB.db.query(FindUser,(err,result) => {
      if(err) throw err
      if(result?.length >= 1) {
        res.json({
          "data":null,
          "message":"this userName exist."
        })

      } else {
        let InsertUser = `INSERT INTO users (user_name, first_name, last_name)
        VALUES ('${body?.user_name}','${body?.first_name}','${body?.last_name}')`;
        connectDB.db.query(InsertUser,(err,result) => {
          if(err) throw err
          let getUser = `SELECT * FROM users Where user_id = '${result?.insertId}'`;
          connectDB.db.query(getUser,(err,result) => {
            res.json({
              "data":result,
              "message":"User Create Succsessfully."
            })
          })
        })

      }
    })
    
  

  } 
})
app.put('/api/v1/users/update', (req, res) => {
  // validate request body
  const body = req?.body;
  const ValidateForm = schemaValidate.validate(body)

  if (!ValidateForm?.res) {
    res.json({
      "data": null,
      "message": "required"
    });


  } else {
    let FindUser = `SELECT * FROM users Where user_id = '${body?.user_id}'`;
    connectDB.db.query(FindUser, (err, result) => {
      if (err) throw err
      if (!result?.length >= 1) {
        res.json({
          "data": null,
          "message": "this user is not found"
        });
      } else {
        let InsertUser = `UPDATE users SET first_name = '${body?.first_name}',last_name = '${body?.last_name}' WHERE user_id = '${body?.user_id}'`;
        connectDB.db.query(InsertUser, (err, result) => {
          if (err) throw err
          console.log("ss2" + JSON.stringify(result))
          let getUser = `SELECT * FROM users Where user_id = '${body?.user_id}'`;
          connectDB.db.query(getUser, (err, result) => {
            res.json({
              "data": result,
              "message": "User Updated Succsessfully."
            });
          })
        });
      }
    });
  }
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is import on ${port}`);
})


