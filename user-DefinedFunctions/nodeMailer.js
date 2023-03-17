const nodemailer = require('nodemailer')
const { mailConfig } = require('../configurations/mailConfig.js')
const { env } = require('process')
async function sendMail({ name, bookingStatus, refresa, email }) {
    try {
        let transporter = nodemailer.createTransport(mailConfig)
        let html = `<p><br />Hi ${name},</p><p>Booking ${refresa} ${bookingStatus}!</p><p>Cordially</p><p>&nbsp;</p><p>&nbsp;</p>`

        let mailContent = {
            from: env.SMTP_USER,
            to: email,
            subject: `Booking ${bookingStatus}`,
            html: html
        }

        let info = await transporter.sendMail(mailContent)
        console.log('Message sent: %s', info.messageId)
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
        return
    } catch (e) {
        console.error(e)
        return { success: false, error: e.message }
    }
}

module.exports = {
    sendMail
}
