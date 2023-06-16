import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MovieComp from "./Movie";
import axios from "axios";
import MoviesRed from "../Utils/MoviesRed";


const MoviesComp =() => {

    const [movieids, setMovieids] = useState([])
    const [movies, setMovies] = useState([])
    const [movieTitle, setMovieTitle] = useState('')
    const navigate = useNavigate()

    
  useEffect(() => {
    
    const getAuth = async () =>
    {
    let token =sessionStorage["token"]
    let resp = await axios.get("http://localhost:8000/api/users", {headers : {'x-access-token' : token}});
    if(!resp.data)
    {
      sessionStorage.clear()
      navigate('/')
      }
    }
    getAuth()
    const getMovieids = async () =>
    {
      let data = await MoviesRed.getItems()
      let moviess = [{}]
      moviess = data
      let ids = moviess.map(x => x._id)
      setMovieids(ids)
      setMovies(moviess)
    }
    getMovieids()  
  },[movies, navigate])

  const FindMovie = async () => {
    const movie = movies.find((x) => x.Title === movieTitle)
    alert(movie.Title + " is being searched....")
    navigate('/MoviesPage/Movie/' + movie._id)
  }
  
  return (
    <div>
        <h2>Movies</h2>
        <div style={{display : "flex", fontWeight : "bold"}}>
        <button onClick={() => navigate('Movies')}>All Movies</button> &nbsp; 
        <button onClick={() => navigate('/AddMovie')}>Add Movie</button>  &nbsp;
				<div>
        <input type="text" name="Movie Search" onChange={e => setMovieTitle(e.target.value)} /> &nbsp;
        <button onClick={FindMovie} >Find</button>
        </div>
        </div>
        <div>
        {movieids.map((mov) =>
          {
            return ( <div key={mov+1}> <MovieComp movieid={mov}  /> </div>)
          })}
        </div>
    </div>
  )
}

export default MoviesComp
