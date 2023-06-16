import { useState, } from "react";
import { Link, useNavigate } from "react-router-dom";
import MoviesRed from "../Utils/MoviesRed";
import axios from "axios";
import Footer from "../footer";


function AddMovie() {
   
  const [movie, setMovie] = useState({Title : '', Released : Date(), Genre : [], Images : ''})
  const navigate = useNavigate()
 
  const getAuth = async () =>
  {
  let token =sessionStorage["token"]
  let resp = await axios.get("http://localhost:8000/api/users", {headers : {'x-access-token' : token}});
  if(!resp.data)
  {
    sessionStorage.clear()
    navigate('/')
    }
    else
    {
      addMovie()
    }
  }
  const addMovie = async () =>
    {
      await MoviesRed.addItem( movie);
      alert(movie.Title + " had been added!!")
      navigate('/MoviesPage/Movies')
    }

  return (
    <div>
      <h1>Movie Editor</h1>
      <div>
        Name: &nbsp; &nbsp; &nbsp; &nbsp; <input type="text"  onChange={e => setMovie({...movie, Title : e.target.value}) } /><br/>
        Premiered: &nbsp; <input type="date" onChange={e => setMovie({...movie, Released : e.target.value}) } /><br/>
        Genres: &nbsp; &nbsp; &nbsp; <input type="text" onChange={e => setMovie({...movie, Genre : e.target.value}) } /><br/>
        Pic: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <input type="text" onChange={e => setMovie({...movie, Images : e.target.value}) } /><br/>
      </div>
      <button onClick={getAuth}>Save</button> &nbsp;
      <button><Link to='/MoviesPage/Movies'>Cancel</Link></button> <br/>
      <div className="App">
        <Footer />
      </div>
      </div>
  );
}

export default AddMovie;


