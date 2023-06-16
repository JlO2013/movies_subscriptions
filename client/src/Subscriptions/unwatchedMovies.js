import { useState, useEffect } from "react";
import SubsRed from "../Utils/SubsRed";
import MoviesRed from "../Utils/MoviesRed";


function UnwatchedMovies(props) {
   
    const [ vacantMovies, setVacantMovies] = useState([])
    const [newSubscription, setNewSubscription] = useState({MovieID: '', MemberID: props.memID, Date: Date})
    const [watchedMovies, setWatchedMovies] = useState([{}])

    useEffect(() =>
    {
        const getUnwatchedMovies = async () => {
            let movies = [{}]
            let data =  await MoviesRed.getItems()
            movies = data
            let movsByMembers = [{}]
            movsByMembers = props.memberMovies
            setWatchedMovies(movsByMembers)
            let wtchedID = movsByMembers.map(x => x.MovieID)
            
            let vacantMos = movies.filter(x => !wtchedID.includes(x._id))
            setVacantMovies(vacantMos)
        }  
        getUnwatchedMovies()
    },[props.memberMovies, watchedMovies, vacantMovies]) 

    const findMovieByName = async (name) => {
        const movies = await MoviesRed.getItems()
        const movie = movies.find((movie) => movie.name === name)
        return movie;
    }
        const customSubmit = async (e) =>
    {
        e.preventDefault();
        let movie = await findMovieByName(e.Title)
        let movieID = movie._id
        console.log(movieID)
        const newMovie = newSubscription
        await SubsRed.addItem(newMovie)
        alert("Successfully Subscribed") 
        refreshPage()
    }
    function refreshPage() {
        window.location.reload(false);
      }
    
    return (
        <div style={{ width : "320px", border : "solid 2px red", display:"flex"}}>
            { 
            <form onSubmit={customSubmit}>
                <br/>
                <select style={{width:'150px'}} onChange={e => setNewSubscription({...newSubscription, MovieID : e.target.value})}>
                    { 
                        vacantMovies.map((movie, index) => {
                        return <option key={index} value={movie._id}> {movie.Title} </option>
                    })
                    }
                    </select> 
                &nbsp; <input type="date"  onChange={e => setNewSubscription({...newSubscription, Date : e.target.value})}></input>  <br/>
                <input type="submit" value="Subscribe!" style={{display:"flex"}}/>  <br/>
            </form>
            }
        </div> 
    )
}
export default UnwatchedMovies


