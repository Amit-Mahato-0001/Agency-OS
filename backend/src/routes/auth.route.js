const express = require('express')
const signupHandler = require('../controllers/auth.controller')
const router = express.Router()

router.post('/signup', signupHandler)

module.exports = router