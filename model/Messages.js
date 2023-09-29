const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    seen: {
        type: [String],
    },
    time: {
        type: Date,
        default: Date.now(),
    },
    group: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Messages', MessageSchema)