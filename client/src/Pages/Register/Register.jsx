import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import axios from "axios";


export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); //this will prevent the page from automatically refreshing when we press the register button.
    setError(false);
    try{
      const res = await axios.post("auth/register",{
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
      console.log(res);
    }
    catch(err){
      console.log(err);
      setError(true);
    }
    
  }
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input 
          className="registerInput" 
          type="text" 
          placeholder="Enter your username..." 
          onChange = {(e)=>setUsername(e.target.value)} //whenever this input is chenged its gonna automatically call the update function setUsername() from our useState().   
          />
           
        <label>Email</label>
        <input 
          className="registerInput" 
          type="email" 
          required
          placeholder="Enter your email..." 
          onChange = {(e)=>setEmail(e.target.value)} //whenever this input is chenged its gonna automatically call the update function setUsername() from our useState().     
          />
        <label>Password</label>
        <input 
          className="registerInput" 
          type="password" 
          required
          placeholder="Enter your password..." 
          onChange = {(e)=>setPassword(e.target.value)} //whenever this input is chenged its gonna automatically call the update function setUsername() from our useState().   
          />
        <button className="registerButton" type="submit">Register</button>
      </form>
        <button className="registerLoginButton"><Link className="link" to="/login">Login</Link></button>
        {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
    </div>
  );
}
