import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MemberRed from "../Utils/MemberRed";
import axios from "axios";
import Footer from "../footer";


function EditMemberComp(props) {
    const navigate = useNavigate()
  
    const {id} = useParams(props.memberid)
    const [member, setMember] = useState({ Name : '', Email : '', City : ''})
  
    useEffect(() => {
     
      async function getMember()
   {
      let data = await MemberRed.getItem(id)
         setMember(data)
   }
   getMember();
    }, [id, navigate]);
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
        updateMember()
      }
    }
    const updateMember = async (e) =>
 {
  let obj = member
   await MemberRed.updateItem(id, obj)  
  alert(member.Name + ' had been updated!!')
  navigate('/MembersPage/Members')
 }
 
  return (
    <div style= {{ width : "500px", border : "solid 2px red"}}>
        
      <h1>Member Editor</h1>
    <div style={{display:'flex'}}>
      Name: &nbsp; <input type="text" value={member.Name} onChange={e => setMember({...member, Name : e.target.value}) } /><br/></div>
      <div style={{display:'flex'}}>
      Email: &nbsp; <input type="text" value={member.Email} onChange={e => setMember({...member, Email : e.target.value}) } /><br/>
      </div>
      <div style={{display:'flex'}}>
      City: &nbsp; <input type="text" value={member.City} onChange={e => setMember({...member, City : e.target.value}) } /><br/>
      </div>
      
      <button onClick={getAuth}>Update</button> &nbsp;
      <button onClick={() => navigate('/MembersPage/Members')}>Cancel</button> <br/>
      <div className="App">
        <Footer />
      </div>
      </div>
  );
}

export default EditMemberComp;

