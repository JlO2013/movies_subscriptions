import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MemberRed from "../Utils/MemberRed";
import SubsRed from "../Utils/SubsRed";
import axios from "axios";



function SubscriptionsByMovID(props) {

  const [membersByMovie, setMembersByMovie] = useState([{}])
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
        getMembersSubs()
      }
    }
    const getMembersSubs = async () => {
      let subsis = [{}]
      let members = [{}]
      let subsByMovie = [{}]
      let membersByMo = [{}]
      
      let data2 = await SubsRed.getItems()
      subsis = data2
      subsis.map(sub => {
          if(sub.MovieID === props.movid)
          {
            subsByMovie.push(sub)
          }
          return subsByMovie
        })
      let data = await MemberRed.getItems()
      members = data
      members.map(member => {
        subsByMovie.map(subMov => {
          if(subMov.MemberID === member._id)
          {
            subMov.Date = (new Date(subMov.Date).getDate() + '/' + new Date(subMov.Date).getMonth() + '/' + new Date(subMov.Date).getFullYear())
            let obj = {
              Name : member.Name,
              Date : subMov.Date,
              memberid : member._id
            }
            membersByMo.push(obj)
          }
          return subsByMovie
        })
        setMembersByMovie(membersByMo)
        return membersByMo
      })
    }
    getAuth()
  },[props.movid, navigate])
  
  return (
    <div>
      <div style={{ width : "300px", border : "solid 2px blue", height: "130px", overflowY: 'scroll'}} >
        <h4>Subscriptions Watched</h4>
        <ul>
          {
            membersByMovie.slice(1).map((x, index) =>
            { 
              return <li style={{display : 'flex'}} key={index} ><Link to={"/MembersPage/Member/" + x.memberid}>{x.Name}</Link> &nbsp; - &nbsp; {x.Date} </li>
            })
          }
        </ul>
      </div>
      <br/>
    </div>
  );
}
export default SubscriptionsByMovID;

