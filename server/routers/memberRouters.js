const express = require('express')
const membersBL = require('../models/membersBL')

const router = express.Router()

router.get('/', async function(req, res)
{
    let members = await membersBL.getMembers()
    return res.json(members)
})


router.get('/:id', async(req, res) =>
{
    let member = await membersBL.getMember(req.params.id)
    return res.json(member)
})

router.post('/', async(req, resp) => {
    let obj = req.body
    let data = await membersBL.addMember(obj)
    return resp.json(data)
})

router.put('/:id', async(req, resp) => {
    let id = req.params.id
    let obj = req.body
    let status = await membersBL.updateMember(id, obj)
    return resp.json(status)
})

router.delete('/:id', async(req, resp) => {
    let id = req.params.id
    let status = await membersBL.deleteMember(id)
    return resp.json(status)
})

module.exports = router