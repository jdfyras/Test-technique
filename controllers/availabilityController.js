let moment = require('moment')
const createError = require('http-errors')
const Train = require('../models/Train')
const BookingLog = require('../models/BookingLog')
const Seats = require('../models/Seats')
const {
    searchSchema,
    updateSeatSchema,
    seatSchema,
    deleteSeatSchema,
    allSeatSchema,
    getSeatsBySeatIdSchema
} = require('../user-DefinedFunctions/validatorFunction')
const { createUUID } = require('../user-DefinedFunctions/udf')
module.exports = {
    trainAvailability: async (req, res, next) => {
        try {
            const searchCode = createUUID()
            let query = await searchSchema.validateAsync(req.body, {
                context: { todayDate: moment(new Date()).subtract(1, 'days') }
            })
            let filter = {
                departureDate: {
                    $gte: new Date(query.jouney[0].depDate),
                    $lt: moment(new Date(query.jouney[0].depDate)).add(1, 'd')
                }
            }
            const rows = await Train.find(filter)
            const saveReply = new BookingLog({
                searchCode: searchCode,
                query: query,
                reply: rows,
                name: 'trainAvailability'
            })
            saveReply.save()
            return res.json({ success: true, searchCode, trainList: rows })
        } catch (err) {
            console.error(err)
            return next(err)
        }
    },
    seatAvailability: async (req, res, next) => {
        try {
            let query = await seatSchema.validateAsync(req.body)
            const { searchCode, trainId } = query
            const availabilityCheck = await BookingLog.findOne({
                searchCode: searchCode,
                name: 'trainAvailability'
            })
            if (!availabilityCheck) {
                return next({ status: 400, message: 'Invalid searchCode' })
            }
            const seats = await Seats.find({ availability: true, refTrain: trainId })

            if (!seats) {
                return next({ status: 400, message: 'Invalid searchCode' })
            }
            return res.json({
                success: true,
                searchCode,
                seatsAvailable: seats.length,
                seatsList: seats
            })
        } catch (err) {
            console.error(err)
            return next(err)
        }
    },
    getAllSeats: async (req, res, next) => {
        try {
            const { trainId } = await allSeatSchema.validateAsync(req.params)
            const seats = await Seats.find({ refTrain: trainId })

            if (!seats) {
                return next({ status: 400, message: 'Invalid trainId' })
            }
            return res.json({
                success: true,
                numberOfSeats: seats.length,
                seatsAvailable: seats.filter((s) => s.availability).length,
                seatsList: seats
            })
        } catch (err) {
            console.error(err)
            return next(err)
        }
    },
    getSeatsBySeatId: async (req, res, next) => {
        try {
            let query = await getSeatsBySeatIdSchema.validateAsync(req.params)
            const { seatId } = query
            const seat = await Seats.findById(seatId).populate('refTrain').select(' -__v')

            if (!seat) {
                return next({ status: 400, message: 'Invalid searchCode' })
            }
            return res.json({ success: true, seat: seat })
        } catch (err) {
            console.error(err)
            return next(err)
        }
    },
    deleteSeat: async (req, res, next) => {
        try {
            const query = await deleteSeatSchema.validateAsync(req.params)
            const seat = await Seats.findOneAndRemove({
                refTrain: query.trainId,
                seatNumber: query.seatNumber
            })
            if (!seat)
                throw createError.Conflict(
                    `The Seat with the given refresa= ${query.refresa} is not found `
                )
            return res.json({ success: true, message: 'Seat is deleted successfully' })
        } catch (error) {
            console.error(error)
            return next(error)
        }
    },
    updateSeat: async (req, res, next) => {
        try {
            const query = await updateSeatSchema.validateAsync({ ...req.query, ...req.params })

            const { seatNumber, travelClass, availability, fare, seatId } = query
            if (!(travelClass || availability || fare))
                throw createError.NotFound(
                    `The Seat with the given seatNumber= ${seatNumber} is not found `
                )
            const seat = await Seats.findById(seatId)

            if (!seat)
                throw createError.NotFound(
                    `The Seat with the given seatNumber= ${seatNumber} is not found `
                )

            let filter = {}
            if (seatNumber) filter.class = seatNumber
            if (travelClass) filter.class = travelClass
            if (availability) filter.availability = availability
            if (fare) filter.fare = fare
            filter.updateAt = Date.now()
            const seatUpdate = await Seats.findOneAndUpdate({ _id: seat._id }, filter, {
                new: true
            })
            if (!seatUpdate) throw createError.Conflict('update Failure.')

            return res.json({ success: true, Seat: seatUpdate })
        } catch (error) {
            console.error(error)
            return next(error)
        }
    }
}
