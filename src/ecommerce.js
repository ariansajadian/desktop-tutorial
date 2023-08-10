
const {app} = require('./server')

const {db} = require('./MYSQL')



app.get('/api/users/list', (req,res) => { 
   db.query('SELECT * FROM users', (err,result) => {
    res.json({
     "data":result,
     "message":"in users table is empty "
    })
  })
}) 

app.get('/api/roles/list', (req,res) => { 
    db.query('SELECT * FROM roles', (err,result) => {
     res.json({
      "data":result,
      "message":"in roles table is empty "
     })
   })
 })

app.get('/api/user_roles/list', (req,res) => { 
    db.query('SELECT * FROM user_roles', (err,result) => {
     res.json({
      "data":result,
      "message":"in user_roles table is empty "
     })
   })
 }) 
 
app.get('/api/products/list', (req,res) => { 
    db.query('SELECT * FROM products', (err,result) => {
     res.json({
      "data":result,
      "message":"in products table is empty "
     })
   })
 }) 
 
app.get('/api/basket/list', (req,res) => { 
    db.query('SELECT * FROM basket', (err,result) => {
     res.json({
      "data":result,
      "message":"in basket table is empty "
     })
   })
 })

app.get('/api/user_basket/list', (req,res) => { 
    db.query('SELECT * FROM user_basket', (err,result) => {
     res.json({
      "data":result,
      "message":"in user_basket table is empty "
     })
   })
 })
 
app.get('/api/orders/list', (req,res) => { 
    db.query('SELECT * FROM orders', (err,result) => {
     res.json({
      "data":result,
      "message":"in orders table is empty "
     })
   })
 }) 

 app.get('/api/order_detail/list', (req,res) => { 
    db.query('SELECT * FROM order_detail', (err,result) => {
     res.json({
      "data":result,
      "message":"in order_detail table is empty "
     })
   })
 }) 
 
app.get('/api/categories/list', (req,res) => { 
    db.query('SELECT * FROM categories', (err,result) => {
     res.json({
      "data":result,
      "message":"in categories table is empty "
     })
   })
 }) 
 
app.get('/api/discount/list', (req,res) => { 
    db.query('SELECT * FROM discount', (err,result) => {
     res.json({
      "data":result,
      "message":"in discount table is empty "
     })
   })
 }) 
  
app.get('/api/payment/list', (req,res) => { 
   db.query('SELECT * FROM payment', (err,result) => {
    res.json({
     "data":result,
     "message":"in payment table is empty "
    })
  })
}) 



const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is import on ${port}`);
})



