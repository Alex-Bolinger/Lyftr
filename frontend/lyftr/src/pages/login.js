import React, { useState } from "react";
import Navbar from './components/Navbar'
import { useNavigate } from "react-router-dom";
import Home from "./home";



  
const Login = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);


  const navigate = useNavigate();

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var {email, pass} = document.forms[0];
    //verify info with backend
    console.log(email);
    console.log(pass);
    setIsSubmitted(true);
  };



  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>E-Mail </label>
          <input type="text" name="email" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div
      style={{
        display: 'inline',
        justifyContent: 'left',
        alignItems: 'left',
        height: '80vh',
        fontSize: '14px'
      }}
    >
      <Navbar/>
    <div className="app">
      <div className="login-form">
        <div className="title">Log In</div>
        {isSubmitted ? navigate('/Home', {state: {loggedIn: true}}) : renderForm}
      </div>
    </div>
    </div>
  );
};
  
export default Login;