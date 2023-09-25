const express = require('express');
const router = express.Router()

const {db} = require('../data/MYSQL');
const { verifyToken } = require('../middleware/authMiddleware');
const { createOrder } = require('../controller/orderController');

//create
router.post('/:id', verifyToken, createOrder);

module.exports = router