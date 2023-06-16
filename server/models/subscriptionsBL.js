const Subscriptions = require('./subscriptionModel')
const Member = require('./memberModel')
const Movies = require('./movieModel')

const getSubscriptions = () => {
  return Subscriptions.find({})
}
const getSubscription = (id) =>
{
    return Subscriptions.find(id)
}

const addSubscription = async (newSubscription) =>
{
    const subscription = new Subscriptions(newSubscription)   
    await Member.findById({_id: subscription.MemberID})
    await Movies.findById({_id: subscription.MovieID})
    await subscription.save()
    return subscription._id
}
const deleteSubscription = async (id) =>
{
  await Subscriptions.findOneAndDelete(id)
}


module.exports = {getSubscriptions, getSubscription, addSubscription, deleteSubscription}