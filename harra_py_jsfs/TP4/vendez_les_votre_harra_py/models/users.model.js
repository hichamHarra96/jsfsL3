const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : String,
    money : { type : Number, default : 200},
    login : { type : String, required : true, unique : true },
    password : { type : String, required : true },
    admin : { type : Boolean, default: false}
})

module.exports = userSchema;

const dbConnection = require('../controllers/db.controller.js');
const User = dbConnection.model('User', userSchema, 'users');

module.exports.model = User;