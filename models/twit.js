const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const twitSchema = new Schema({
    userID: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    likes: {
        type: Array,
        default: [],
    },
    comments: {
        type: Array,
        default: [],
    },
    shares: {
        type: Array,
        default: [],
    },

    
}, { timestamps: true});

const Twit = mongoose.model('Twit', twitSchema);
module.exports = Twit;