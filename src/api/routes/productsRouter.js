const express = require('express');
const router = express.Router()
const {db} = require('../data/MYSQL');
const { verifyTokenAndAdmin } = require('../middleware/authMiddleware');
const { createProduct, productUpdate, getProducts } = require('../controller/productController');

//create
router.post('/', verifyTokenAndAdmin, createProduct);

//update
router.put('/', verifyTokenAndAdmin, productUpdate);

//get
router.get('/', getProducts);

module.exports = router