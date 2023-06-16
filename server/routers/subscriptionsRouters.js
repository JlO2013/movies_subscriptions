const express = require('express')
const subscriptionsBL = require('../models/subscriptionsBL')

const router = express.Router()

router.get('/', async function(req, res)
{
    let members = await subscriptionsBL.getSubscriptions()
    return res.json(members)
})

router.get('/:id', async(req, res) =>{
    let id = req.params.id
    let subscription = await subscriptionsBL.getSubscription(id)
    return res.json(subscription)
})

router.post('/', async(req, resp) => {
    let obj = req.body
    let data = await subscriptionsBL.addSubscription(obj)
    return resp.json(data)
})
router.delete('/:id', async(req, resp) => {
    let id = req.params.id
    let status = await subscriptionsBL.deleteSubscription(id)
    return resp.json(status)
})

module.exports = router