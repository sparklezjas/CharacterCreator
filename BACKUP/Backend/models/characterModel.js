const mongoose = require('mongoose')

const Schema = mongoose.Schema

const characterSchema = new Schema({
    head: {
        type: String,
        required: true
    },
    face: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    arms: {
        type: String,
        required: true
    },
    legs: {
        type: String,
        required: true
    },
    weapon: {
        type: String,
        required: true
    },
    characterName: {
        type: String,
        required: true
    },
    HP: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Character', characterSchema)