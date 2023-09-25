const jwt = require('jsonwebtoken');
const { db } = require('../data/MYSQL');

const verifyToken = (req,res,next) => {
    const authHeader = req?.headers.token
    try {  
    if(authHeader){
         const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token,process.env.JWT_SEC);           
         db.query(`SELECT * FROM users Where id = '${decoded.id}'`, (err,user) => {             
          req?.user = user[0]
          next()         
         })        
      } else {
        res.status(401).json("you are not authenticated")
      }
  }catch(err) {
    res.status(403).json("token is not vallid")
  }   
}


const verifyTokenAndAutohrization =  (req,res,next) => {
    verifyToken(req,res, () => {
      if(req?.user.id === req?.params.id || req?.user.isAdmin) {         
        next()
      } else {
        res.status(401).json("you are not allowed to that")
      }
    })
}

///verify admin in user table
const  verifyTokenAndAdmin = (req,res,next) => {
  verifyToken(req,res, () => {
    if(req?.user.isAdmin) {  
      next()
      } else {
        res.status(401).json("you are not allowed to that")
      }
      
  })  
}



///verify admin in seprate table(should update)

/**const verifyTokenAndAdmin = (req,res,next) => {
  verifyToken(req,res, () => {
    db.query(`SELECT * FROM user_roles WHERE user_id = '${req.user.id}'`, (err,result) => {
      if(result[0].role_id === 1) {
        next()
      } else {
        res.status(401).json("you are not allowed to that")
      }
    })
  })  
}*/

module.exports = {verifyToken,verifyTokenAndAutohrization,verifyTokenAndAdmin}