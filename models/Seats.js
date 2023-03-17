const mongoose = require('mongoose')

const SeatsSchema = new mongoose.Schema({
    seatNumber: {
        type: String
    },
    class: {
        type: String
    },
    availability: {
        type: Boolean
    },
    fare: {
        type: Number
    },
    refTrain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'train',
        required: true
    },
    updateAt: {
        type: Date,
        required: false
    }
})

SeatsSchema.virtual('seatId').get(function () {
    return this._id.toHexString()
})

SeatsSchema.set('toJSON', {
    virtuals: true
})

const Seats = mongoose.model('seat', SeatsSchema)
module.exports = Seats
