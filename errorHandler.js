module.exports = (err, req, res, next) => {
    if (err.isJoi === true) {
        err.message = err.message.replaceAll('"', '|')
        err.status = 400
    }
    if (
        err.code === 11000 &&
        err.name === 'MongoServerError' &&
        err.message.indexOf('cin_1 dup key: { cin') !== -1
    ) {
        err.message = 'User with given cin is already been registered'
        err.status = 409
    }
    if (
        err.code === 11000 &&
        err.name === 'MongoServerError' &&
        err.message.indexOf('dup key: { phone') !== -1
    ) {
        err.message = 'User with given phone number is already been registered'
        err.status = 409
    }
    return res.status(parseInt(err.status) || 500).json({
        success: false,
        statusCode: err.statusCode || parseInt(err.status) || 500,
        message: err.message
    })
}
