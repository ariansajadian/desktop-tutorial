const express = require('express');
const router = express.Router()
const { verifyTokenAndAdmin, verifyToken } = require('../middleware/authMiddleware');
const { createOrderDetail, deleteUserBasket, orderdetailList, deleteOrderDetail } = require('../controller/orderDetailController.');

// create 
router.post('/create/:id', verifyToken, createOrderDetail, deleteUserBasket);

//update
//router.put('update/:id', verifyTokenAndAdmin)

//list
router.get('/list/:id', verifyTokenAndAdmin, orderdetailList);

//delete
router.delete('/delete/:id', verifyTokenAndAdmin, deleteOrderDetail)


module.exports = router