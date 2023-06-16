const express = require('express')
const MoviesBL = require('../models/moviesBL')

const router = express.Router()

router.get('/', async function(req, res)
{
    let movies = await MoviesBL.getMovies()
    return res.json(movies)
})

router.get('/:id', async(req, res) =>
{
    let movie = await MoviesBL.getMovie(req.params.id)
    return res.json(movie)
})

router.post('/', async(req, resp) => {
    let obj = req.body
    let data = await MoviesBL.addMovie(obj)
    return resp.json(data)
})

router.put('/:id', async(req, resp) => {
    let id = req.params.id
    let obj = req.body
    let status = await MoviesBL.updateMovie(id, obj)
    return resp.json(status)
})

router.delete('/:id', async(req, resp) => {
    let id = req.params.id
    let status = await MoviesBL.deleteMovie(id)
    return resp.json(status)
})

module.exports = router