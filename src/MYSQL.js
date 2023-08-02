
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'server'
  
  })
  
  const connection = db.connect((err) => {
    if (err) throw err
    console.log('MYSQL connected')
  })
  
  module.exports = {
  db,
  connection
  }
  