const createError = require('http-errors')
const User = require('../models/User')
const { registerSchema, loginSchema } = require('../user-DefinedFunctions/validatorFunction')
const JWT = require('../user-DefinedFunctions/jwtHelper')

module.exports = {
    register: async (req, res, next) => {
        try {
            const result = await registerSchema.validateAsync(req.body)
            const exist = await User.findOne({ email: result.email })
            if (exist)
                throw createError.Conflict(`User with given email is already been registered`)
            const userModel = new User(req.body)
            const user = await userModel.save()
            const accessToken = await JWT.signAccessToken(
                user.id,
                `${user.firstName} ${user.lastName}`,
                user.email
            )
            return res.json({
                success: true,
                message: 'Account registered successfully.',
                accessToken
            })
        } catch (error) {
            console.error(error)

            next(error)
        }
    },
    refreshToken: async (req, res, next) => {
        try {
            const { refreshToken } = req.body
            if (!refreshToken) throw createError.BadRequest()
            const userId = await JWT.verifyRefreshToken(refreshToken)

            const accessToken = await JWT.signAccessToken(userId)
            const refToken = await JWT.signRefreshToken(userId)
            res.json({ success: true, accessToken: accessToken, refreshToken: refToken })
        } catch (error) {
            console.error(error)
            next(error)
        }
    },

    logout: async (req, res, next) => {
        try {
            const { refreshToken } = req.body
            if (!refreshToken) throw createError.BadRequest()
            const userId = await JWT.verifyRefreshToken(refreshToken)
            if (!userId || userId?.error) next(createError.InternalServerError())
            await JWT.logout(refreshToken)
            res.sendStatus(204).json({
                success: true,
                message: 'Logout successfully.'
            })
        } catch (error) {
            console.error(error)
            next(error)
        }
    },
    login: async (req, res, next) => {
        try {
            const result = await loginSchema.validateAsync(req.body)
            const user = await User.findOne({ email: result.email })
            if (!user) throw createError.NotFound('User  not registered')
            const isMatch = await user.isValidPassword(result.password)
            if (!isMatch) throw createError.Unauthorized('User password not valid')

            const accessToken = await JWT.signAccessToken(
                user.id,
                `${user.firstName} ${user.lastName}`,
                user.email
            )
            const refreshToken = await JWT.signRefreshToken(user.userId)
            res.status(200).json({ success: true, accessToken, refreshToken })
        } catch (error) {
            console.error(error)
            next(error)
        }
    }
}
