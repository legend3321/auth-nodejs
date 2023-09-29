const mongoose = require('mongoose')
const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3
    },
    users: {
        type: [String],
    },
    admin: {
        type: [String],
    },
    date: {
        type: Date,
        default: Date.now()
    }

})


module.exports = mongoose.model('Groups', GroupSchema)