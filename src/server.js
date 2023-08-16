const express = require('express');
const swaggerUi = require('swagger-ui-express');
const app = express()
const bodyParser = require("body-parser")
const YAML = require('yamljs')
const swaggerJSDocs = YAML.load('src/config/swagger/documentation.yaml');


;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extends:true}));
app.use(express.json());


const userRouter = require('./api/routers/userRouter')
const rolesRouter =  require('./api/routers/rolesSlide') 
const productsSlide = require('./api/routers/productsSlide')
const categoriesSlide = require('./api/routers/categories')
const orderSlide = require('./api/routers/ordersSlide')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDocs))


app.use('/api/v1/users', userRouter)
app.use('/api/v1/roles', rolesRouter)
app.use('/api/v1/products', productsSlide)
app.use('/api/v1/categories', categoriesSlide)
app.use('/api/v1/orders', orderSlide)




const port = process.env.PORT || 5000;

app.listen(port, () => {
console.log(`server is import on ${port}`);
})


 


