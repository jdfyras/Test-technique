require('dotenv').config()
const { env } = require('process')
const createError = require('http-errors')

const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    next(createError.NotFound())
})
app.use((err, req, res, next) => {

    return res.status(parseInt(err.status) || 500).json({
        success:false,
        statusCode: err.statusCode || parseInt(err.status) || 500,
        message: err
    })
})

const { PORT } = env

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`NODE ENVIRONNEMENT : ${env.NODE_ENV}`)
})
