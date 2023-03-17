const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return next({ success: false, status: 401, message: 'No token, authorization denied' })
        }
        let jwtString = req.headers.authorization.split(' ')
        const [code, token] = jwtString
        if (code !== `Bearer`)
            return next({ success: false, status: 401, message: 'No Bearer, authorization denied' })

        if (!token) {
            return next({ success: false, status: 401, message: 'No token, authorization denied' })
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        console.error(err)
        next({ success: false, status: 401, message: 'Token is not valid' })
    }
}
