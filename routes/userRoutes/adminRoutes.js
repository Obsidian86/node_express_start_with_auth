const express = require('express')
const router = express.Router();

const adminHandler = require('../../handlers/userHandlers/adminHandler')

router.get('/getallusers', adminHandler.getAllUsers)
router.get('/getuser/:username', adminHandler.getUserByUsername)
router.put('/updateuser/:username', adminHandler.updateUser)
router.delete('/deleteuser/:username', adminHandler.deleteUser)

module.exports = router