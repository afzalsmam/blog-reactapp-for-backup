import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { LoginFailure, LoginStart, LoginSuccess } from "../../context/Actions";
import "./login.css";
import axios from "axios";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const {dispatch, isFetching} = useContext(Context);
  const [error, setError] = useState(false)
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(LoginStart());
    try{
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value //This problem took me a day to fix, instead of writing password, I wrote passwordRed. Lesson learnt in coding you have to be very careful while typing!
      });

     dispatch(LoginSuccess(res.data)); //So we used LoginSuccess() from actions as we had already sepcified everything there but we could also do  dispatch({type: "LOGIN_SUCCESS", payload: res.data});
    }
    catch(err){
      dispatch(LoginFailure());
      console.log("wrong credentials");
      setError(true);
    }
    
  };
  console.log(isFetching);
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input 
          className="loginInput" 
          type="text" 
          placeholder="Enter your username..." 
          ref={userRef}  
          />
        <label>Password</label>
        <input 
        className="loginInput" 
        type="password" 
        placeholder="Enter your password..." 
        ref={passwordRef}  
        />
        <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
      </form>
        <button className="loginRegisterButton"><Link className="link" to="/register">Register</Link></button>
        {error && <span style={{color:"red", marginTop:"10px"}}>Wrong Credentials!</span>}
    </div>
  );
}
