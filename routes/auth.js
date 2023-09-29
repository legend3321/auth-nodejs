const router = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {

    const userExist = await User.findOne({ email: req.body.email })
    if (userExist) { return res.status(400).send('User Already Exists') }

    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password
    })

    try {
        const userSaved = await user.save()
        res.send(userSaved)

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'nobodyhails@gmail.com',
                pass: process.env.email_pass
            }
        })

        const mailOptions = {
            from: 'nobodyhails@gmail.com',
            to: user.email,
            subject: 'Verify your Account',
            text: 'click: <a href=https://localhost:8000/auth/' + user._id + '>Click Here</a>'
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) { console.log(error) }
            else { console.log(info) }
        })
    } catch (err) {
        console.log(err)
    }

})

router.get('/login', (req, res) => {
    res.send('Hello')
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) { return res.status(400).send('User Does Not Exist') }


    const password = await bcrypt.compare(req.body.password, user.password)
    if (!password) { return res.status(400).send('password incorrect') }

    const token = jwt.sign({ _id: user._id }, process.env.secret_token)

    res.header('auth-token', token).send("User Logged In \n JWT: " + token)
})

router.get('/:id', async (req, res) => {

    const user = await User.findById(req.params.id)

    if (user) {
        user.verified = true
        const validated = await user.save()
        if (validated) {
            res.send('Email Verified Please return to Home Page')
        }
    }

})

module.exports = router
