import React, { useRef, useContext } from 'react'
import './Login.css'
import { Link } from "react-router-dom";
import { Context } from '../../../context/Context';
import axios from 'axios';


const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`http://localhost:8000/api/auth/login`, {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  // console.log(user)
  // console.log(isFetching)
  return (
    <div className='body'>
      <div className='login'>
        <span className="loginTitle">Login</span>
        <form onSubmit={handleSubmit} className='loginForm'>
          <label>Username</label>
          <input className="loginInput" type="text" placeholder="Enter your username..."
            ref={userRef}
          />
          <label>Password</label>
          <input className="loginInput" type="password" placeholder="Enter your password..."
            ref={passwordRef}
          />
          <button type='submit' className="loginButton" disabled={isFetching}>Login</button>
        </form>
        <button className="loginRegisterButton">
          <Link className="link" to="/register">
            Register
          </Link>
        </button>
      </div>
    </div>
  )
}

export default Login