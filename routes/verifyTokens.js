const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

module.exports = function (req, res, next) {
    const token = req.header('auth-token')
    if (!token) return res.status(400).send('Access Denied')

    try {
        const verified = jwt.verify(token, process.env.secret_token)
        req.user = verified

        next()
    } catch (err) {
        console.log(err)
    }
}