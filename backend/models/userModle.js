const mongoose = require("mongoose")

const userModel = mongoose.Schema({
    name: {
        type: String,
        required: [true, "pleasse name"]
    },
    city: {
        type: String,
        // required: [true, "pleasse city"]
    },
    email: {
        type: String,
        required: [true, "pleasse email"]
    },
    profile: {
        type: String,
        required: [true, "pleasse profile is requre"]
    },
    password: {
        type: String,
        required: [true, "pleasse profile is requre"]
    }

}, { timestamp: true })

module.exports = mongoose.model("user", userModel)