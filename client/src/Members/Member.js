import { useState, useEffect } from "react";
import SubscriptionsByMemberID from "../Subscriptions/SubscriptionsByMemberID";
import {  useNavigate, useParams } from 'react-router-dom';
import '../App.css'
import axios from "axios";
import MemberRed from "../Utils/MemberRed";
import SubsRed from "../Utils/SubsRed";
import Footer from "../footer";


function MemberComp(props) {
  const navigate = useNavigate()
  const params = useParams()
  const [memDaId, setMemDaId] = useState()
  const [memberData, setMemberData] = useState({});

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
        getMember()
      }
    }
    getAuth()
    async function getMember()
   {
      let data = await MemberRed.getItem(params.id || props.memberid)
      setMemberData(data)
      setMemDaId(memberData._id)
    }
  },[ memberData._id, params.id, props.memberid, navigate])

  const editMember = () => {
    navigate('/MembersPage/editMember/' + props.memberid)
  }
  const deleteMember = async () => {
    debugger
    let subs =  [{}]
   subs = await SubsRed.getItems()
    let memberSubs = subs.filter(sub => sub.MemberID === memDaId)
    await MemberRed.deleteItem(props.memberid || params.id)
    memberSubs.forEach(memSub => SubsRed.deleteItem(memSub._id))
    alert(memberData.Name + " had been deleted!")
    refreshPage()
    return subs
      }
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className='App'>
      <div style={{ width : "350px", border : "solid 2px red"}}>
      <h3 style={{display : "flex"}}>{memberData.Name}</h3>
      <div style={{display : "flex", fontWeight : "bold"}}>Email: &nbsp; {memberData.Email}</div>
      <div style={{display:'flex', fontWeight : "bold"}}> City: &nbsp; {memberData.City}</div>
      <div style={{display:'flex'}}>
      <button onClick={editMember}>Edit</button> &nbsp; 
      <button onClick={deleteMember}>Delete</button></div><br/>
      <div  >
        <SubscriptionsByMemberID Memid={memDaId}/>
      </div>
          <br/>
    </div>
    <br/>
    <div className="App">
        <Footer />
      </div>

  </div>
  );
}
export default MemberComp;

