import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import'../App.css'
import axios from "axios";
import MemberRed from "../Utils/MemberRed";
import MemberComp from "./Member";

function MembersComp() {

  const [memberids, setMemberids ] = useState([])
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
      else
      {
        getMembersids()  
      }
    }
    getAuth()
    const getMembersids = async () =>
    {
      let data = await MemberRed.getItemsIDs()
      const members = data
      setMemberids(members)
    }
  },[navigate])
  


  return (
    <div  style={{ width : "500px", border : "solid 2px black"}}>
    <div className='App'>
    <h2>Subscriptions</h2>
    <div >
    <button onClick={() => navigate('Members')}>All Members</button> &nbsp; 
    <button onClick={() => navigate('/AddMember')}>Add Member</button> &nbsp;
    </div>
    </div><br/>
    {memberids.map((mem, ) =>
          {
            

            return(<div key={mem+1}> <MemberComp memberid={mem}  /></div>)
          })}
    </div>
  );
}

export default MembersComp;

