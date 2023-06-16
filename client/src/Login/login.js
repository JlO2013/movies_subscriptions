import './Login.css'
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function LoginComp() {
  const navigate = useNavigate();
 const [user, setUser] = useState({Username : "", Password : ""});

 useEffect(() => 
 {
  sessionStorage.clear()
 },[])
 const login = async () =>
 {
  let data = await axios.post("http://localhost:8000/api/auth/login", user);
  sessionStorage.setItem("token", data.data.token)
  sessionStorage.setItem("Fullname", data.data.Fullname)
  navigate("/MoviesPage")

 }

  return (
    <div className="Login">

      <h3>Login Page</h3>

      User Name : <input type="text" onChange={e => setUser({...user, Username : e.target.value}) } /> <br/>

      Password : <input type="text" onChange={e => setUser({...user, Password : e.target.value}) } /> <br/>

      <input type="button" onClick={login} value="Login" />

    </div>
  );
}

export default LoginComp;
