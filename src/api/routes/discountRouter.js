const express = require('express');
const router = express.Router()
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAutohrization } = require('../middleware/authMiddleware');
const { createDiscount, getDiscount, deleteDiscount, updateDiscount } = require('../controller/discountController');

//Create
router.post('/create/:id', verifyTokenAndAdmin, createDiscount);
//Update
router.put('/update/:id', verifyTokenAndAdmin,updateDiscount);
//list
router.get('/list/:id', verifyTokenAndAdmin, getDiscount);
//delete
router.delete('/delete/:id', verifyTokenAndAdmin, deleteDiscount);

module.exports = router