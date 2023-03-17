const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        lowercase: true
    },
    lastName: {
        type: String,
        required: true,
        lowercase: true
    },
    cin: {
        type: Number,
        unique: true,
        required: true
    },
    phone: {
        type: Number,
        unique: true,
        required: true
    },
    dialCode: {
        type: String,
        default: '+216'
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    street: {
        type: String,
        default: null
    },
    governorate: {
        type: String,
        default: null
    },
    postalcode: {
        type: Number,
        default: null
    },
    city: {
        type: String,
        default: null
    },
    country: {
        type: String,
        default: null
    },
    image: {
        type: String
    }
})

UserSchema.virtual('userId').get(function () {
    return this._id.toHexString()
})

UserSchema.set('toJSON', {
    virtuals: true
})

UserSchema.pre('save', async function (next) {
    try {
        if (this.isNew) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(this.password, salt)
            this.password = hashedPassword
        }
        next()
    } catch (error) {
        next(error)
    }
})

UserSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}
const User = mongoose.model('user', UserSchema)
module.exports = User
