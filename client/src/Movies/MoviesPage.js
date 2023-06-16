import MoviesComp from './AllMovies';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'
import Footer from "../footer";



function MoviesPage() {
const navigate = useNavigate()

useEffect( () =>
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
  }
  getAuth()
},[navigate])
const logout = () => {

  sessionStorage.clear()
  navigate('/')
}

  
  
  return (
    <div>

    <br/>
    <div>
        <button><Link to='/MoviesPage/Movies'>Movies</Link></button> &nbsp; 
        <button><Link to='/MembersPage/Members'>Subscriptions</Link></button> &nbsp; 
        <button onClick={logout}>Log Out</button>
    </div>
    <br/>
    <br/>

    <div>
      <div style={{ width : "500px", border : "solid 2px black"}}>
        <MoviesComp />
      </div>
    </div>
    <div className="App">
        <Footer />
      </div>
    </div>
  );
}

export default MoviesPage;
