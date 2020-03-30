const express = require('express')
const router = express.Router();

const profileHandler = require('../../handlers/userHandlers/profileHandler')

router.get('/getuser/:username', profileHandler.getUserByUsername)
router.put('/updateuser/:username', profileHandler.updateUser)
router.delete('/deleteuser/:username', profileHandler.deleteUser)

module.exports = router