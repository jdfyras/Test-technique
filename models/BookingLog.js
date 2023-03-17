const mongoose = require('mongoose')

const BookingLogSchema = new mongoose.Schema({
    dateTime: { type: Date, default: Date.now },
    searchCode: { type: String },
    name: { type: String },
    query: { type: mongoose.Schema.Types.Mixed },
    reply: { type: mongoose.Schema.Types.Mixed }
})

BookingLogSchema.set('toJSON', {
    virtuals: true
})

const BookingLog = mongoose.model('bookingLog', BookingLogSchema)
module.exports = BookingLog
