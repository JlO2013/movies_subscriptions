import { useEffect, useState } from "react";
import axios from "axios";
import {  useNavigate, useParams } from "react-router-dom";
import MoviesRed from "../Utils/MoviesRed";
import Footer from "../footer";


function EditMovieComp(props) {
   
  const navigate = useNavigate()
  const {id} = useParams(props.movieid)
 const [movie, setMovie] = useState({Title : '', Released : 0, Genre : [], Images : ''})




 useEffect(() =>
  {
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
        getMovie();
      }
    }
    getAuth()
    
    async function getMovie()
    {
      let data = await MoviesRed.getItem(id);
      setMovie(data)
    }
    
  },[id, navigate])
  
  const updateMovie = async () =>
  {
    await MoviesRed.updateItem(id, movie)  
   alert(movie.Title + ' had been updated!!')
   navigate('/MoviesPage/Movies')
  }
 
  return (
    <div style= {{ width : "500px", border : "solid 2px red"}}>
      <h1>Movie Editor</h1>
      
      <div style={{display:'flex'}}>
          Name: &nbsp; &nbsp; &nbsp; &nbsp; 
          <input type="text" value={movie.Title}  onChange={e => setMovie({...movie, Title : e.target.value}) } /><br/></div>
          <div style={{display:'flex'}}>
          Premiered: &nbsp; 
          <input type="text" value={movie.Released} onChange={e => setMovie({...movie, Released : e.target.value}) } /><br/></div>
          <div style={{display:'flex'}}>
          Genres: &nbsp; &nbsp; &nbsp; 
          <input type="text" value={movie.Genre} onChange={e => setMovie({...movie, Genre : e.target.value}) } /><br/></div>
          <div style={{display:'flex'}}>
          Pic: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
          <input type="text" value={movie.Images} onChange={e => setMovie({...movie, Images : e.target.value}) } /><br/></div>
          <button onClick={updateMovie}>Update</button> &nbsp;
         
          <button onClick={() => navigate('/MoviesPage/Movies')}>Cancel</button> <br/>
          <div className="App">
        <Footer />
      </div>
      </div>        
  );
}

export default EditMovieComp;
