import { useEffect, useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import UnwatchedMovies from "./unwatchedMovies";
import MoviesRed from "../Utils/MoviesRed";
import SubsRed from "../Utils/SubsRed";
import axios from "axios";

function SubscriptionsByMemberID(props) {

  const [moviesByMember, setMoviesByMember] = useState([{}])
  const [watchedMovies, setWatchedMovies] = useState([{}])
  const navigate = useNavigate()
  const [isExist, setIsExist] = useState(false);
   
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
      else
      {
        getSubsForMember()
      }
    }
    getAuth()
    const getSubsForMember = async() =>
  {
    let Subscrips = [{}]
    let movies = [{}]
    let subsByMember = [{}]
    let moviesByMem = [{}]
    let data = await SubsRed.getItems()
    Subscrips = data
    Subscrips.map(Sub => {
      if(Sub.MemberID === props.Memid)
      {
        subsByMember.push(Sub)
      }
      return subsByMember
    })
    let data2 = await MoviesRed.getItems()
    movies = data2
    movies.map(movie => {
      subsByMember.map(subMem => {
        if(subMem.MovieID === movie._id)
        {
          let obj = {
            Title : movie.Title,
            Date : subMem.Date,
            movieid : movie._id,
            memberid : props.Memid,
            subid : subMem._id
          }
          if(obj.memberid !== undefined && obj.movieid !== undefined)
          {
            moviesByMem.push(obj)
          }
          else
          {
            SubsRed.deleteItem(obj.subid)
          }
        setMoviesByMember(moviesByMem)
        }
        return SubsRed
      })
      return moviesByMem
    })
    let watchedIds = moviesByMem.map(x => x.movieid)
    let watchedMovies = subsByMember.filter( x => watchedIds.map(y => y === x.movieid))
    setWatchedMovies(watchedMovies)
  }
  
},[ props.Memid, navigate])
    
  return (
   <div style={{ width : "330px", border : "solid 2px blue"}}>
      <h5 style={{display : "flex"}}>Movies Watched</h5>   
        <div>
          <div><button style={{fontSize:'70%', display : "flex"}} onClick={() => setIsExist(!isExist)}>Subscribe to a new movie</button></div>
          {
          isExist?
            <div>
             <UnwatchedMovies key={props.Memid + 1} memID={props.Memid} memberMovies={watchedMovies} /> 
           </div>
           : null
          }
            <ul >
            {
             moviesByMember.slice(1).map(x =>
              { let uuid = crypto.randomUUID();
                if(uuid !== undefined) 
                {
                  const subDate = (new Date(x.Date).getDate() + '/' + (new Date(x.Date).getMonth() + 1) + '/' + new Date(x.Date).getFullYear())
                  return <li key={uuid}  style={{display : 'flex'}}><Link to={"/MoviesPage/Movie/" + x.movieid}>{x.Title}</Link> &nbsp; - &nbsp; {subDate}</li> 
                }
                return x
              }
            )}
          </ul>
        </div>    
    </div>
  )
}
export default SubscriptionsByMemberID;

