const express = require('express')
const router = express.Router()
const isAuthenticated = require('../middlewares/isAuthenticated.js')
const authController = require('../controllers/authController.js')
router.post('/register', authController.register)
router.post('/refreshToken', isAuthenticated, authController.refreshToken)
router.delete('/logout', isAuthenticated, authController.logout)
router.post('/login', authController.login)
module.exports = router
