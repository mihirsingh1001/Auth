const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSecham = new Schema({
    Firstname : String,
    Lastname : String,
    email : String,
    phone : String,
    address : String,
    password : String
})

module.exports = mongoose.model('user', userSecham, 'usecase');