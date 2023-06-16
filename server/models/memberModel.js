const mongoose = require('mongoose');



let memberSchema = new mongoose.Schema({

    Name : String,
    Email : String,
    City : String
})
const Members = mongoose.model('Members', memberSchema)

module.exports = Members
