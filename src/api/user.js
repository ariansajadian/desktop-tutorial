

app.get('/api/v1/users/list',  (req ,res)  => {
    const getdata =  FindUser(`SELECT * FROM users`,(err,result) => {  
      console.log(result.length)
      response('',res,result.length)
    })
         
  })
  
  app.post('/api/v1/users/create',  (req, res) => {
    // validate request body
    const body = req?.body;
    const ValidateForm =  schemaValidate(body)
    
    if (!ValidateForm?.res) {
      res.json({
        "data": null,
        "message": "required"
      });
  
    } else {
      let finduser =`SELECT * FROM users Where user_name = '${body?.user_name}'`;
         db.query(finduser, (err,result)=> {
   
          console.log('runing')     
        if(!result?.length >= 1) {
          responseHandler(res,result)
        } else {
          let InsertUser = `INSERT INTO users (user_name, first_name, last_name)
          VALUES ('${body?.user_name}','${body?.first_name}','${body?.last_name}')`;
           db.query(InsertUser,(err,result) => {
            if(err) throw err
            let getUser = `SELECT * FROM users Where user_id = '${result?.insertId}'`;
             
            db.query(getUser,(err,result) => {
              console.log(result) 
              responseHandler(res,result)
            })
          })
        }
      })  
    } 
  })
    
  
  app.put('/api/v1/users/update', (req, res) => {
    // validate request body  
    const body = req?.body;
    const ValidateForm = schemaValidate(body)
  
    if (!ValidateForm?.res) {
      res.json({
        "data": null,
        "message": "required"
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