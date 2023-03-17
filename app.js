process.env.TZ = 'Europe/London'
require('dotenv').config()
const { env } = require('process')
const createError = require('http-errors')

const express = require('express')
const morgan = require('morgan')
require('./configurations/mongooseConifg')
const authRoute = require('./routes/authRoute')
const trainAvailabilityRoute = require('./routes/trainAvailabilityRoute.js')
const seatAvailabilityRoute = require('./routes/seatAvailabilityRoute.js')
const bookingRoute = require('./routes/bookingRoute.js')
const errorHandler = require('./errorHandler')
const app = express()

// const passport = require('passport')
// const session = require('express-session')
// const MongoStore = require('connect-mongo')
// const configureJWTStrategy = require('./middlewares/passport-jwt')
// app.use(
//     session({
//         secret: 'bla bla bla'
//     })
// )
// app.use(
//     session({
//         secret: 'bla bla bla',
//         store: MongoStore.create({ mongoUrl: env.MONGODB_URI }),
//         dbName: env.MONGODB_NAME
//     })
// )
// app.use(passport.initialize())
// app.use(passport.session())
// configureJWTStrategy(passport)

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    next()
})
app.use('/auth', authRoute)
app.use('/train', trainAvailabilityRoute)
app.use('/seat', seatAvailabilityRoute)
app.use('/booking', bookingRoute)
app.use((req, res, next) => {
    next(createError.NotFound())
})
app.use(errorHandler)

const { PORT } = env

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`NODE ENVIRONNEMENT : ${env.NODE_ENV}`)
})
