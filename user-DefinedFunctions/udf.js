const paxesCheck = function (paxes, bookingRQ) {
    try {
        const paxesNbre = paxes.adults + paxes.children
        const passengersNbre = bookingRQ.passengers.length
        let infantsCount = 0
        for (let index in bookingRQ.passengers) {
            if (bookingRQ.passengers[index].infants) {
                infantsCount += 1
            }
        }
        if (!(paxesNbre === passengersNbre)) {
            return {
                success: false,
                message: 'Passanger information missed'
            }
        } else if (paxes.infants > paxes.adults) {
            return {
                success: false,
                message: 'Number of Infants should be less than number of adults'
            }
        } else if (infantsCount !== paxes.infants) {
            return {
                success: false,
                message: 'Infants information missed'
            }
        } else {
            return {
                success: true,
                message: 'PaxesCheck OK !'
            }
        }
    } catch (error) {
        console.error(error)
        return {
            success: false,
            message: 'Passanger information missed',
            error
        }
    }
}
function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (Math.random() * 16) | 0
        let v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}
function createRefresa() {
    return 'xyxxy'.replace(/[xy]/g, function (c) {
        let r = (Math.random() * 16) | 0
        let v = c === 'x' ? r : (r & 0x3) | 0x8
        let refresa = v.toString(16)
        return refresa.toUpperCase()
    })
}
module.exports = {
    createRefresa,
    createUUID,
    paxesCheck
}
