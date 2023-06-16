const mongoose = require('mongoose');

let movieSchema = new mongoose.Schema({

    Title : String,
    Released : Date,
    Genre : [],
    Images : String
})

const Movies = mongoose.model('Movies', movieSchema)

module.exports = Movies