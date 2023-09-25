const express = require('express');
const router = express.Router()

const {db} = require('../data/MYSQL');
const { verifyTokenAndAdmin } = require('../middleware/authMiddleware');
const { createCategories, updateCategories, getCategories, deleteCategories } = require('../controller/categoryController');
 
//Create
router.post('/create/', verifyTokenAndAdmin , createCategories);
//Update 
router.put('/update/:id', verifyTokenAndAdmin, updateCategories);
//Get
router.get('/list/:title', getCategories);
//Delete
router.delete('/:id', verifyTokenAndAdmin, deleteCategories);



module.exports = router 