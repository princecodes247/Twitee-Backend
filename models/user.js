const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userID: {
        type: String,
        //required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },  
    password: {
        type: String,
        required: true,
    },
    role: Number,
    verified: { type: Number, default: 0},
    activeStatus: { type: Boolean, default: false},
    confirmationCode: Number
}, { timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;