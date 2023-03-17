const express = require('express')
const router = express.Router()
const {
    seatAvailability,
    getAllSeats,
    getSeatsBySeatId,
    updateSeat,
    deleteSeat
} = require('../controllers/availabilityController.js')
const isAuthenticated = require('../middlewares/isAuthenticated.js')
router.post('/availability', isAuthenticated, seatAvailability)
router.get('/:trainId', isAuthenticated, getAllSeats)
router.get('/getSeatsBySeatId/:seatId', isAuthenticated, getSeatsBySeatId)
router.delete('/:trainId/:seatNumber', isAuthenticated, deleteSeat)
router.patch('/:seatId', isAuthenticated, updateSeat)
module.exports = router
