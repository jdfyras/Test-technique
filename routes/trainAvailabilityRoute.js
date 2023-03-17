const express = require('express')
const router = express.Router()
const { trainAvailability } = require('../controllers/availabilityController.js')
const isAuthenticated = require('../middlewares/isAuthenticated.js')
router.post('/availability', isAuthenticated, trainAvailability)

module.exports = router
