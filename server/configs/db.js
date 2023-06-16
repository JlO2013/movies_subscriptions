const mongoose = require('mongoose')

const connectDB = () => {
    mongoose
        .connect('mongodb://127.0.0.1:27017/Final_Project')
        .then(() => console.log("connected"))
        .catch((error) => console.log(error))
    }
    
    module.exports = connectDB
 