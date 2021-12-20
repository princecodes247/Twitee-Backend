const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userID: {
        type: String,
        //required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        default: "Hi! I'm on twitee",
    },
    phone: {
        type: String,
        required: true,
    },   
    password: {
        type: String,
        required: true,
    },
    twits: [
      {
        body: Date,
        comments: Array,
        userID: String,
        likes: Array,
      }
    ], 
    role: Number,
    verified: { type: Number, default: 0},
    activeStatus: { type: Boolean, default: false},
    confirmationCode: Number
}, { timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;