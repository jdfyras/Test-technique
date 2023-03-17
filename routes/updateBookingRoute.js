const express = require('express')
const router = express.Router()
const isAuthenticated = require('../middlewares/isAuthenticated')
const { updateBooking } = require('../controllers/bookingController.js')
router.get('/:refresa', isAuthenticated, updateBooking)
module.exports = router
