const Joi = require('joi')
const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    passwordConfirm: Joi.any()
        .equal(Joi.ref('password'))
        .required()
        .label('Confirm password')
        .messages({ 'any.only': '{{#label}} does not match' }),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    cin: Joi.string().required(),
    phone: Joi.string().required(),
    dialCode: Joi.string().required(),
    street: Joi.string().optional().allow(null),
    governorate: Joi.string().optional().allow(null),
    postalcode: Joi.string().required(),
    gender: Joi.string().valid('M', 'F').required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    image: Joi.string().optional().allow(null)
})
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})
const updateBookingSchema = Joi.object({
    refresa: Joi.string().length(5).required(),
    statusId: Joi.number().required()
})
const deleteBookingSchema = Joi.object({
    bookingId: Joi.string().required()
})
const searchSchema = Joi.object({
    jouney: Joi.array()
        .items(
            Joi.object({
                depDate: Joi.date().min(Joi.ref('$todayDate')),
                origin: Joi.string().required().max(3),
                destination: Joi.string().required().max(3)
            }).required()
        )
        .required(),
    class: Joi.string().required().valid('P', 'Y', 'W', 'C', 'F', 'all').allow(null),
    journeyType: Joi.string().required().valid('oneway', 'roundtrip'),
    paxes: Joi.object({
        adults: Joi.number().min(1).max(9).required(),
        children: Joi.number().max(9).required(),
        infants: Joi.number().max(Joi.ref('adults')).required()
    }).required()
})
const createBookingSchema = Joi.object({
    searchCode: Joi.string().length(36).required(),
    trainId: Joi.string().required(),
    seatId: Joi.string().required(),
    passengers: Joi.array()
        .items(
            Joi.object({
                title: Joi.string()
                    .optional()
                    .default('Mr')
                    .valid(
                        'Mr',
                        'Mstr',
                        'Mrs',
                        'Ms',
                        'Miss',
                        'Master',
                        'DR',
                        'CHD',
                        'MST',
                        'PROF',
                        'Inf'
                    ),
                firstName: Joi.string().min(2).max(32).required(),
                lastName: Joi.string().min(2).max(32).required(),
                birthDate: Joi.alternatives().conditional('type', {
                    is: 'ADT',
                    then: Joi.date().max(Joi.ref('$adultBirth')).required(),
                    otherwise: Joi.date()
                        .max(Joi.ref('$infBirth'))
                        .min(Joi.ref('$adultBirth'))
                        .required()
                }),
                nationality: Joi.string().required(),
                cin: Joi.string().optional(),
                phone: Joi.string().required(),
                dialCode: Joi.string().required(),
                address: Joi.string().required(),
                city: Joi.string().optional(),
                countryCode: Joi.string().required(),
                countryName: Joi.string().required(),
                email: Joi.string().email().optional(),
                gender: Joi.string().valid('M', 'F').required(),
                type: Joi.string().valid('ADT', 'CHD', 'INS', 'YTH', 'SNR').required(),
                infants: Joi.object({
                    birthDate: Joi.date()
                        .min(Joi.ref('$infBirth'))
                        .required()
                        .max(Joi.ref('$todayDate'))
                        .required(),
                    firstName: Joi.string().min(2).max(32).required(),
                    lastName: Joi.string().min(2).max(32).required(),
                    nationality: Joi.string().required(),
                    cin: Joi.string().optional(),
                    sex: Joi.string().valid('M', 'F').required()
                }).optional()
            }).required()
        )
        .required()
})
const getSeatsBySeatIdSchema = Joi.object({
    seatId: Joi.string().required()
})
const seatSchema = Joi.object({
    searchCode: Joi.string().length(36).required(),
    trainId: Joi.string().required()
})
const allSeatSchema = Joi.object({
    trainId: Joi.string().required()
})
const deleteSeatSchema = Joi.object({
    seatNumber: Joi.string().required(),
    trainId: Joi.string().required()
})
const updateSeatSchema = Joi.object({
    seatNumber: Joi.string().optional(),
    seatId: Joi.string().required(),
    travelClass: Joi.string().optional(),
    availability: Joi.boolean().optional(),
    fare: Joi.number().optional()
})
module.exports = {
    registerSchema,
    loginSchema,
    searchSchema,
    createBookingSchema,
    updateBookingSchema,
    deleteBookingSchema,
    seatSchema,
    deleteSeatSchema,
    updateSeatSchema,
    allSeatSchema,
    getSeatsBySeatIdSchema
}
