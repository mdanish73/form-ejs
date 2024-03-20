const mongoose = require('mongoose');

const studentModel = mongoose.model("students", new mongoose.Schema({
    fullName: String,
    fatherName: String,
    gender: String,
    age: Number,
    phone: Number,
    course: String
}));

module.exports = studentModel;