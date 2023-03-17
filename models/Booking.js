const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    searchCode: {
        type: String,
        required: true
    },
    refresa: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    statusId: {
        type: Number,
        required: true
    },
    bookingDate: {
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        required: false
    },
    passengers: [mongoose.Schema.Types.Mixed],
    refUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    refTrain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'train',
        required: true
    },
    refSeat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'seat',
        required: true
    }
})

BookingSchema.virtual('bookingId').get(function () {
    return this._id.toHexString()
})

BookingSchema.set('toJSON', {
    virtuals: true
})

const Booking = mongoose.model('booking', BookingSchema)
module.exports = Booking
