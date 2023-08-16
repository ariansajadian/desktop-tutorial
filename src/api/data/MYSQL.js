
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'e-commerce'
  
  })
  
  const connection = db.connect((err) => {
    if (err) throw err
    console.log('MYSQL connected')
  })
  
  module.exports = {
  db,
  connection
  }
  