import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";


  
function SignUp() {

  const [isSubmitted, setIsSubmitted] = useState(false);
    const [accessToken, setAccessToken] = useState("");

  const navigate = useNavigate();


  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { name, email, pass, confirm } = document.forms[0];
    console.log(name);
    console.log(email);
    console.log(pass);
    if (pass.value === confirm.value) {
      //send info to backend
      console.log(name);
      console.log(email);

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
          "user_credentials": {
              "email": email.value,
              "password": pass.value
       },
    "user_name": name.value
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://127.0.0.1:3001/api/signup", requestOptions)
  .then(response => response.text())
  .then(result => {
    let res = JSON.parse(result);
<<<<<<< Updated upstream
    //const [accessToken, setAccessToken] = useState(res);
=======
    console.log(res);
    setAccessToken(res);
    setIsSubmitted(true);
>>>>>>> Stashed changes
  })
  .catch(error => console.log('error', error));

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
        {isSubmitted ? navigate('/Home', {state: {accessToken: accessToken}}) : renderForm}
      </div>
    </div>
    </div>
  );
};
  
export default SignUp;