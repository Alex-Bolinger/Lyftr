import React, { useState } from "react";
import Navbar from "./components/Navbar";


  
function SignUp() {

  const [isSubmitted, setIsSubmitted] = useState(false);


  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { name, email, pass, confirm } = document.forms[0];
    if (pass.value === confirm.value) {
      //send info to backend
      console.log(name);
      console.log(email);

      /*fetch('/signup', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userCredentials: {
            email: email,
            password: pass
          },
          user_name: name
        })
      }).then(res => {
        console.log(res);
      })*/

      setIsSubmitted(true);
    } else {
      window.alert("Password Mismatch!");
    }
  };



  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Name </label>
          <input type="text" name="name" required />
          </div>
        <div className="input-container">
          <label>E-Mail </label>
          <input type="text" name="email" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
        </div>
        <div className="input-container">
          <label>Confirm Password </label>
          <input type="password" name="confirm" required />
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
        <div className="title">Sign Up</div>
        {isSubmitted ? window.location.replace('Home') : renderForm}
      </div>
    </div>
    </div>
  );
};
  
export default SignUp;