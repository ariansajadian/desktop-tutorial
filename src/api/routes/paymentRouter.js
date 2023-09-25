const express = require('express');
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAutohrization } = require('../middleware/authMiddleware');
const { createPayment, paymentList } = require('../controller/paymentController');
const router = express.Router()


//Create
router.post('/create/', verifyTokenAndAdmin, createPayment);

//Get
router.get('/list/:id', verifyTokenAndAutohrization, paymentList);




module.exports = router