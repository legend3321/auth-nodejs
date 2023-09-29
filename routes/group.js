const router = require('express').Router()
const Group = require('../model/Groups')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

router.post('/addGroup', async (req, res) => {
    let newGrp = Group.findById(req.params.id)
    if (!newGrp) { return res.status(400).send('Group Already Exists') }

    newGrp = new Group({
        name: req.body.name,
        admin: jwt.decode(req.header('auth-token'), process.env.secret_token)._id,
        users: jwt.decode(req.header('auth-token'), process.env.secret_token)._id
    })

    const savedGrp = await newGrp.save()

    res.send(savedGrp)
})

router.post('/addUser/:id', async (req, res) => {
    const group = await Group.findById(req.params.id)

    let check = group.users.find((id) => { return id == req.body.id })

    if (!check) {
        group.users.push(req.body.id)

        const savedGrp = await group.save()


        return res.send("user Added")
    }

    res.status(400).send("user Already Exists")

})

module.exports = router

