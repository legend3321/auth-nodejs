const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const verify = require('./routes/verifyTokens')
const group = require('./routes/group')
const socketio = require('socket.io')
const http = require('http')

const app = express()
const server = http.createServer(app)

//Import Routes
const authRoutes = require('./routes/auth')

app.use(express.json())

dotenv.config()

//connect Database
mongoose.connect(
    process.env.db_connect,
    { useNewUrlParser: true },
    () => console.log("Db connected")
)

//Routes Middleware
app.use('/auth', authRoutes)
app.use('/group', group)

app.get('/', (req, res) => {
    res.json({ "Hello": "hello" })
})

server.listen(8000, () => console.log("Server Running..."))