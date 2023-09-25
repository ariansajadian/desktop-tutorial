const express = require('express');
const router = express.Router()
const { createUserBasket, deleteitems, updateCart, cartList } = require('../controller/userBasketController');

//Create
router.post('add/:id', createUserBasket);

// Update 
router.put('update/:id', updateCart);

// List
router.get('list/:id', cartList);

//Delete 
router.delete('delete/:id', deleteitems);

module.exports = router
