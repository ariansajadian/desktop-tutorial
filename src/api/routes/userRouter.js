const express = require('express')
const router = express.Router()
const {verifyToken,verifyTokenAndAutohrization} = require('../middleware/authMiddleware')
const {login,register,userUpdate, getUser} = require('../controller/userController')

router.post('/register', register)

router.post('/login', login) 

router.put('/:id', verifyTokenAndAutohrization, userUpdate)

router.get('/list/:id', verifyTokenAndAutohrization , getUser)


module.exports = router
