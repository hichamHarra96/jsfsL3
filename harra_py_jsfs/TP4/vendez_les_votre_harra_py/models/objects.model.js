const mongoose = require('mongoose');

const objectSchema = new mongoose.Schema({
    description : { type : String, required : true },
    price : { type : Number, required : true }, 
    userId : mongoose.ObjectId 
});

module.exports = objectSchema;

const dbConnection = require('../controllers/db.controller.js');
const Objects = dbConnection.model('Objects', objectSchema, 'objects');

module.exports.model = Objects;