const express = require('express')
const router = express.Router({mergeParams: true})

const authHandler = require('../../handlers/userHandlers/authHandler')

router.post('/register', authHandler.registerUser)
router.post('/login', authHandler.loginUser)
router.post('/refresh/:username', authHandler.refreshUser)

module.exports = router;