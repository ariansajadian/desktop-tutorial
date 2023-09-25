const express = require('express');
const router = express.Router()
const {db} = require('../data/MYSQL');
const { verifyTokenAndAdmin } = require('../middleware/authMiddleware');
const { createRoles, deleteRoles, updateRoles, rolesList } = require('../controller/rolesController');

//Create
router.post('add/:id', verifyTokenAndAdmin, createRoles);

// Update 
router.put('update/:id', verifyTokenAndAdmin, updateRoles);

// Get All List
router.get('list/', verifyTokenAndAdmin, rolesList);

//Delete 
router.delete('delete/:id', verifyTokenAndAdmin, deleteRoles);

module.exports = router