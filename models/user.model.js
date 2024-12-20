const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    name: {
        type: String,
    },
    password: {
        type: String,
    },
    googleId: {
        type: String,
        unique: true,
    },
}, { timestamps: true });

const user = mongoose.model("user", userSchema);
module.exports = user;