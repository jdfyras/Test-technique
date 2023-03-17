let LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')
module.exports = function (passport) {
    passport.use(
        new LocalStrategy(function (email, password, done) {
            User.findOne({ email: email }, function (err, client) {
                if (err) {
                    return done(err)
                }
                if (!client) {
                    return done(null, false, { message: 'Incorrect email.' })
                }
                if (!client.isValidPassword(password)) {
                    return done(null, false, { message: 'Incorrect password.' })
                }
                return done(null, client)
            })
        })
    )

    passport.serializeUser(function (client, done) {
        done(null, client.refUser)
    })

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user)
        })
    })
}
