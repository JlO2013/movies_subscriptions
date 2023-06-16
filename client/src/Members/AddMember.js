import {useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MemberRed from "../Utils/MemberRed";
import Footer from "../footer";
import axios from "axios";

function AddMember() {
  
const [member, setMember] = useState({ Name: '', Email: '', City: ''});
const navigate = useNavigate()
let newMember = member
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
        addMember() 
      }
    }
    const addMember =  () => {
     MemberRed.addItem( newMember);
     alert(newMember.Name + " had been added!!")
     navigate('/MembersPage/Members')
    };

  return (
    <div style= {{ width : "500px", border : "solid 2px red"}}>
        
      <h1>Member Editor</h1>
      <div>
        Name: &nbsp; <input type="text"  onChange={e => setMember({...member, Name : e.target.value}) } /><br/>
        Email: &nbsp; <input type="text" onChange={e => setMember({...member, Email : e.target.value}) } /><br/>
        City: &nbsp; &nbsp; <input type="text" onChange={e => setMember({...member, City : e.target.value}) } /><br/>
      </div>
      <input type="button" value="Add" onClick={getAuth } />
      <button><Link to='/MembersPage'>Cancel</Link></button> <br/>
      <div className="App">
        <Footer />
      </div>
      </div>
  );

}

export default AddMember;


