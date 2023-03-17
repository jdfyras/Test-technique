const { env } = require('process')
const mailConfig = {
    service: env.SMTP_SERVICE,
    host: env.SMTP_HOST,
    port: parseInt(env.SMTP_PORT),
    secure: JSON.parse(env.SMTP_SECURE),
    auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS
    }
}
module.exports = { mailConfig }
