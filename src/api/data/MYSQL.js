
const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.MYSQL_IP,
    user: process.env.MYSQL_LOGIN,
    password: '',
    database: process.env.DB_NAME
  
  })

  const connection = db.connect((err) => {
    if (err) throw err
    console.log('MYSQL connected')
  })
  
  module.exports = {
  db,
  connection
  }
  