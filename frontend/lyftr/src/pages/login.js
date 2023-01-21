import React, { useState } from "react";


  
const Login = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);



  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var {email, pass} = document.forms[0];
    //verify info with backend
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
    <div className="app">
      <div className="login-form">
        <div className="title">Log In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
    </div>
  );
};
  
export default Login;