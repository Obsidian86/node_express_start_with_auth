const express = require('express')
const router = express.Router();

const adminHandler = require('../handlers/adminHandler')

router.get('/getallusers', adminHandler.getAllUsers)
router.get('/getuser/:username', adminHandler.getUserByUsername)
router.put('/updateuser/:username', adminHandler.updateUser)

module.exports = router