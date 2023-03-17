const mongoose = require('mongoose')

const TrainSchema = new mongoose.Schema({
    arrivalTime: {
        type: String
    },
    source: {
        type: String
    },
    destibation: {
        type: String
    },
    travelClass: {
        type: String
    },
    availability: {
        type: String
    },
    prediction: {
        type: String
    },
    confirmTktStatus: {
        type: String
    },
    fare: {
        type: String
    },
    availabilityDisplayName: {
        type: String
    },
    predictionDisplayName: {
        type: String
    },
    availabilityDataSource: {
        type: String
    },
    departureTime: {
        type: String
    },
    distance: {
        type: String
    },
    duration: {
        type: Number
    },
    trainName: {
        type: String
    },
    trainNumber: {
        type: String
    },
    trainType: [String],
    departureDate: {
        type: Date
    }
})

TrainSchema.virtual('trainId').get(function () {
    return this._id.toHexString()
})

TrainSchema.set('toJSON', {
    virtuals: true
})

const Train = mongoose.model('train', TrainSchema)
module.exports = Train
