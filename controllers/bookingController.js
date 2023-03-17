let moment = require('moment')
const createError = require('http-errors')
const BookingLog = require('../models/BookingLog')
const Booking = require('../models/Booking')
const {
    createBookingSchema,
    updateBookingSchema,
    deleteBookingSchema
} = require('../user-DefinedFunctions/validatorFunction')
const { paxesCheck, createRefresa } = require('../user-DefinedFunctions/udf')
const { sendMail } = require('../user-DefinedFunctions/nodeMailer')
const status = { 0: 'Pending', 1: 'Confirmed', 4: 'Canceled' }
module.exports = {
    createBooking: async (req, res, next) => {
        try {
            let query = await createBookingSchema.validateAsync(req.body, {
                context: {
                    todayDate: moment(new Date()).subtract(1, 'days'),
                    adultBirth: moment(new Date()).subtract(18, 'years'),
                    infBirth: moment(new Date()).subtract(2, 'years')
                }
            })
            const { searchCode, passengers } = query
            const availabilityCheck = await BookingLog.findOne({
                searchCode: searchCode,
                name: 'trainAvailability'
            })
            if (!availabilityCheck) {
                return next({ status: 400, message: 'Invalid searchCode' })
            }
            const paxesCh = paxesCheck(availabilityCheck?.query?.paxes, query)
            if (!paxesCh?.success) {
                return next({
                    status: 400,
                    message: paxesCh?.message || 'Passanger information missed'
                })
            }
            let filter = availabilityCheck?.reply.filter(
                (item) => item._id.toString() === query.trainId
            )[0]
            if (!filter) return next({ status: 400, message: 'Invalid trainId' })
            if (filter?.confirmTktStatus !== 'Confirm')
                return next({ status: 400, message: 'Ticket not available' })
            if (filter?.prediction !== 'Available')
                return next({ status: 400, message: 'Booking not available' })
            let refresa = createRefresa()
            let booking = new Booking({
                refresa: refresa,
                statusId: 0,
                status: status[0],
                passengers,
                refUser: req.user.userId,
                refTrain: filter._id,
                refSeat: query.seatId,
                searchCode
            })
            await booking.save()
            if (!booking)
                return next({ status: 500, message: 'Booking is failure . Please try later' })

            let b = await Booking.findOne({ refUser: req.user.userId, refresa })
                .populate('refTrain')
                .populate('refUser')
                .populate('refSeat')
                .select(' -__v')
            if (!b?._doc)
                return next({ status: 500, message: 'Booking is failure . Please try later' })
            sendMail({
                email: req.user.email,
                name: req.user.name,
                bookingStatus: b.status,
                refresa: b.refresa
            })
            return res.json({ success: true, searchCode, booking: b })
        } catch (error) {
            console.error(error)
            return next(error)
        }
    },
    getBooking: async (req, res, next) => {
        try {
            let bookings = await Booking.find({ refUser: req.user.userId })
                .populate('refTrain')
                .populate('refUser')
                .populate('refSeat')
                .select(' -__v')
            return res.json({ success: true, bookings: bookings })
        } catch (error) {
            console.error(error)
            return next(error)
        }
    },
    findByRefresa: async (req, res, next) => {
        try {
            const booking = await Booking.findOne({
                refUser: req.user.userId,
                refresa: req.params.refresa
            })
                .populate('refTrain')
                .populate('refUser')
                .populate('refSeat')
                .select()
            if (!booking)
                throw createError.Conflict(
                    `The Booking with the given refresa= ${req.params.refresa} is not found `
                )

            return res.json({ success: true, booking: booking })
        } catch (error) {
            console.error(error)
            return next(error)
        }
    },
    updateBooking: async (req, res, next) => {
        try {
            const query = await updateBookingSchema.validateAsync({ ...req.query, ...req.params })
            const booking = await Booking.findOne({
                refUser: req.user.userId,
                refresa: query.refresa
            })
            if (!booking)
                throw createError.Conflict(
                    `The Booking with the given refresa= ${query.refresa} is not found `
                )
            const bookingUpdate = await Booking.findOneAndUpdate(
                { _id: booking._id },
                {
                    statusId: query.statusId,
                    status: status[query.statusId],
                    updateAt: Date.now()
                },
                { new: true }
            )
            if (!bookingUpdate)
                return res.status(404).send('The Booking with the given refresa was not found.')
            sendMail({
                email: req.user.email,
                name: req.user.name,
                bookingStatus: bookingUpdate.status,
                refresa: bookingUpdate.refresa
            })
            bookingUpdate.passengers.forEach((element) => {
                if (element.type === 'ADT' && element.email && element.email !== req.user.email)
                    sendMail({
                        email: element.email,
                        name: `${element.firstName} ${element.lastName}`,
                        bookingStatus: bookingUpdate.status,
                        refresa: bookingUpdate.refresa
                    })
            })
            return res.json({ success: true, booking: bookingUpdate })
        } catch (error) {
            console.error(error)
            return next(error)
        }
    },
    deleteBooking: async (req, res, next) => {
        try {
            const query = await deleteBookingSchema.validateAsync(req.params)
            const booking = await Booking.findOneAndRemove({ _id: query.bookingId })
            if (!booking)
                throw createError.Conflict(
                    `The Booking with the given ID is not found for logged user`
                )
            return res.json({ success: true, message: 'booking is deleted successfully' })
        } catch (error) {
            console.error(error)
            return next(error)
        }
    }
}
