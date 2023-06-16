const  Movies = require('../models/movieModel')

const getMovies = () =>
{
  return Movies.find({})
}

const getMovie = (id) =>
{
  return Movies.findById(id) 
}

const addMovie = async (newMovie) =>
{
  const movie = new Movies(newMovie);
  await movie.save();
  return movie._id
}

const updateMovie = async (id, movie) =>
{
  await Movies.findByIdAndUpdate(id, movie)
  return 'Updated succeeded'
}

const deleteMovie = async (id) =>
{
  await Movies.findByIdAndDelete(id)
  return 'Deleted succeeded'
}

module.exports = {getMovies, getMovie, addMovie, updateMovie, deleteMovie}