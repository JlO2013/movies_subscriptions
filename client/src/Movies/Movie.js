import {useState, useEffect} from 'react'
import '../App.css'
import axios from 'axios';
import {  useNavigate, useParams } from 'react-router-dom';
import SubscriptionsByMovID from '../Subscriptions/SubscriptionsByMovID';
import MoviesRed from '../Utils/MoviesRed';
import SubsRed from '../Utils/SubsRed';
import Footer from "../footer";


function MovieComp(props) {
  const [movieData, setMovieData] = useState({Title : '', 
                                              Released : 0,
                                              Genre : [],
                                            Images : ''  });
  const ReleasedDate = (new Date(movieData.Released).getDate() + '/' + new Date(movieData.Released).getMonth() + '/' + new Date(movieData.Released).getFullYear())
  const [moDaId, setMoDaId] = useState()
  const params = useParams()
  const navigate = useNavigate()

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
      let data = await MoviesRed.getItem(props.movieid || params.id);
      setMovieData(data)
      setMoDaId(movieData._id)
    }
    
  },[props.movieid, movieData._id, params.id, movieData.Title, navigate])

  const editMovie = () => {
    navigate('/MoviesPage/editMovie/' + props.movieid)
  }

  const deleteMovie = async () => {
    let subs = [{}]
    subs = await SubsRed.getItems()
    const movieSubs =subs.filter(sub => sub.MemberID === moDaId)
    await MoviesRed.deleteItem(moDaId)
    movieSubs.forEach(movieSub => SubsRed.deleteItem(movieSub._id))
    alert(movieData.Title + " had been deleted!")
    refreshPage()  
    }
  function refreshPage() {
    window.location.reload(false);
  }

  return (
  <div className='App'>
      <div style={{ width : "450px", border : "solid 2px red"}}>       
      <h3 style={{display : "flex"}}>{movieData.Title}, {ReleasedDate }</h3>
      <div style={{display : "flex", fontWeight : "bold"}}>Genres: &nbsp; { movieData.Genre.join(', ')}</div><br/>
      <div style={{display : "flex"}}>
      <img style={{ width : "100px", height : "100px"}} alt='images' src={movieData.Images}/> &nbsp; &nbsp; 
      <div> 
        <SubscriptionsByMovID movid={moDaId} /></div>
      </div>
      <div style={{display : "flex"}}>
      <button onClick={editMovie}>Edit</button> &nbsp; 
      <button onClick={deleteMovie}>Delete</button>
      </div>
    </div>
      <br/>
      <div className="App">
        <Footer />
      </div>
  </div>
);
}
export default MovieComp;
