const express = require('express');
const swaggerUi = require('swagger-ui-express');
const app = express()
const bodyParser = require("body-parser")
const YAML = require('yamljs')
const swaggerJSDocs = YAML.load('src/config/swagger/documentation.yaml');
require('dotenv').config()


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extends:true}));


const userRouter = require('./api/routes/userRouter')
const rolesRouter =  require('./api/routes/rolesRouter') 
const productsRouter = require('./api/routes/productsRouter')
const categoriesRouter = require('./api/routes/categoryRouter')
const userBasketRouter = require('./api/routes/userBasketRouter')
const orderRouter = require('./api/routes/ordersRouter')
const orderDetailRouter = require('./api/routes/orderDetailRouter')
const discountRouter = require('./api/routes/discountRouter')
const paymentRouter = require('./api/routes/paymentRouter')


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDocs))



app.use('/api/v1/users', userRouter)
app.use('/api/v1/roles', rolesRouter)
app.use('/api/v1/products', productsRouter) 
app.use('/api/v1/categories', categoriesRouter)
app.use('/api/v1/user_basket', userBasketRouter)
app.use('/api/v1/orders', orderRouter)
app.use('/api/v1/order_detail', orderDetailRouter)
app.use('/api/v1/discount', discountRouter)
app.use('/api/v1/payment', paymentRouter)





const port = process.env.PORT || 5000;

app.listen(port, () => {
console.log(`server is import on ${port}`);
})


 


