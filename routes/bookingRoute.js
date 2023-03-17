const express = require('express')
const router = express.Router()
const isAuthenticated = require('../middlewares/isAuthenticated')
const {
    getBooking,
    findByRefresa,
    updateBooking,
    deleteBooking,
    createBooking
} = require('../controllers/bookingController.js')
router.get('/', isAuthenticated, getBooking)
router.get('/:refresa', isAuthenticated, findByRefresa)
router.patch('/:refresa', isAuthenticated, updateBooking)
router.delete('/:bookingId', isAuthenticated, deleteBooking)
router.post('/', isAuthenticated, createBooking)
module.exports = router
