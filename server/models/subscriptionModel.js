const mongoose = require('mongoose');


let subscriptionsSchema = new mongoose.Schema({
    MovieID :  {type : mongoose.Schema.Types.ObjectId, ref : 'movies', },
    MemberID : {type : mongoose.Schema.Types.ObjectId, ref : 'Members'},
    Date: Date
},
{timestamps: true})

const Subscriptions = mongoose.model('Subscription', subscriptionsSchema)

module.exports = Subscriptions