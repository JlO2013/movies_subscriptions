const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')


let userSchema = new mongoose.Schema({
    Fullname : {type : String, required : true},
    Username : {type : String, required : true, unique : true},
    Password: {type : String, required : true}
    })

    userSchema.plugin(uniqueValidator);
const Users = mongoose.model('Users', userSchema)

module.exports = Users