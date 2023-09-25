const {schemaValidate} = require('../model/users')
const {Validate} = require('../service/inputService')
const {db} = require('../data/MYSQL')
const {v4 : uuidv4} = require('uuid')
const jwt = require('jsonwebtoken')
 



const generateToken = (id) => {
  return  jwt.sign({id} , process.env.JWT_SEC
    ,{expiresIn: "3d"} )
}



const  register = async (req,res) => {
    const body = req.body
    const validation = await schemaValidate(body)
   if(!validation.res) {
     res.json({
       "data": null,
       "message": "required"
     })
    } else {
     let FindUser = `SELECT * FROM users where user_name = '${body?.user_name}'`;
      
     db.query(FindUser, (err,result) => {
       
        if(result?.length >= 1) {
        res.json({
         "data": null,
         "message": "this user existed"
         })
         } else {  
             let InsertUser = `INSERT INTO users (id , password , user_name , first_name , last_name , isAdmin,register_date)
             VALUES ('${uuidv4()}','${body?.password}','${body?.user_name}','${body?.first_name}',' ${body?.last_name}'  , current_timestamp())`;
            db.query(InsertUser, (err,result) => {
                if(err) throw err           
            let getUser = `SELECT * FROM users Where id = '${result?.id}'`;        
              db.query(getUser, (err,result) => { 
                 res.json({
                    "data": result,
                    "message": "created succsessfully"
                })
             }) 
           }) 
         }
       })    
    }   
}

const login = async (req,res) => {    
    const body =  req?.body
    const request = ["password","user_name"]
    const validation = await Validate (body,request)
   if(!validation.res) {
     res.json({
       "data": null,
       "message": "required"
     })
    } else{
        db.query(` SELECT * FROM users Where password = '${body.password}' AND user_name = '${body.user_name}' ` ,  (err,result) => {                   
              if (result.length >= 1){
               const id = result[0].id
                const token = generateToken(id)
                const {password,...others} = result
              res.json({...others[0],token}
           )    
         } else {
            res.json({message: "username or password is incorrect"})
       }          
    });       
  } 
}
const userUpdate =  async (req,res) => {    
    const body = req?.body
    const request = ["password","user_name"]
    const validation = await Validate (body,request)
   if(!validation?.res) {
     res.json({
       "data": null,
       "message": "required"
     })
    } else {
        let FindUser = `SELECT * FROM users Where id = '${req?.user.id}'`;
        db.query(FindUser, (err, result) => {
          if (err) throw err
          if (!result?.length >= 1) {
            res.json({
              "data": null,
              "message": "this user is not found"
            });
          } else {
            let InsertUser = `UPDATE users SET password = '${body?.password}',user_name = '${body?.user_name}' Where id = '${req.user.id}'`;
            db.query(InsertUser, (err, result) => {
              if (err) throw err
              let getUser = `SELECT * FROM users Where id = '${req.user.id}'`;
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
}

const getUser = async (req,res) => {
     db.query(`SELECT * FROM users Where id = ${req.params.id}`, (err,result) => {
        res.json(result)
     })
}


module.exports = {login,register,userUpdate,getUser}

