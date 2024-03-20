const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    
    password:{
        type: String,
        required: true
    },
    
    photo:{
        type: String,
    },
    
    refreshToken:{
        type: String,
    },
    
    forgetPasswordOTP:{
        value: Number,
        expireAt: Date
    }
});

module.exports = mongoose.model("users", userSchema);