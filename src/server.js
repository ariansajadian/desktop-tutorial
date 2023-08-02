const Joi = require('joi');
const express = require('express');
const bodyParser = require("body-parser");
const {getData} = require('./crudOperation')
//const mysql = require('mysql');
//const { schema } = require('joi/lib/types/object');

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extends:true}));

const connectDB = require('./MYSQL');
connectDB.db
connectDB.connection

const Validate = async (Data, NeddedObj) => {
  let Data_Obj = Object.keys(Data)
  let InputValue

  NeddedObj.forEach(element => {
    if (!Data_Obj.includes(element))
      InputValue = element
  })

  if (!InputValue) {
    return { res: true };
  } else {
    return { res: false, message: `${InputValue} is required.` };
  }
}


app.get('/api/v1/users/list', (req, res) => {
  const getuser = getData('users');

  res.json({
    "data":"result"
  })
    
})


app.post('/api/v1/users/create', async (req, res) => {
  // validate request body
  const body = req?.body;
  const ValidateForm =  await Validate(body, ["user_name", "first_name", "last_name"])
  
  if (!ValidateForm?.res) {
    res.json({
      "data": null,
      "message": ValidateForm?.message
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
app.put('/api/v1/users/update', async (req, res) => {
  // validate request body
  const body = req?.body;
  const ValidateForm = await Validate(body, ["user_name", "first_name", "last_name"])

  if (!ValidateForm?.res) {
    res.json({
      "data": null,
      "message": ValidateForm?.message
    });


  } else {
    let FindUser = `SELECT * FROM users Where user_id = '${body?.user_id}'`;
    db.query(FindUser, (err, result) => {
      if (err) throw err
      if (!result?.length >= 1) {
        res.json({
          "data": null,
          "message": "this user is not found"
        });
      } else {
        let InsertUser = `UPDATE users SET first_name = '${body?.first_name}',last_name = '${body?.last_name}' WHERE user_id = '${body?.user_id}'`;
        db.query(InsertUser, (err, result) => {
          if (err) throw err
          console.log("ss2" + JSON.stringify(result))
          let getUser = `SELECT * FROM users Where user_id = '${body?.user_id}'`;
          db.query(getUser, (err, result) => {
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


