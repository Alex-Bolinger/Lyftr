import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
  
function SignUp() {
    const { authState, authDispatch } = React.useContext(AuthContext);
    let initialData = {
        email: "",
        password: "",
        isSubmitting: false,
        error: null
    }
    const { data, setData } = React.useState(initialData);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    setData({
        ...data,
        isSubmitting: true,
        errorMessage: null
    });

    let { name, email, pass, confirm } = document.forms[0];
    if (pass.value === confirm.value) {
      //send info to backend
      console.log(name);
      console.log(email);

      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
          "user_credentials": {
              "email": email.value,
              "password": pass.value
          },
          "user_name": name.value
      });

      let requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
      };

      fetch("http://127.0.0.1:3001/api/signup", requestOptions)
          .then(res => {
              if (res.ok) {
                  return res.json();
              } else {
                  throw res;
              }
          }).then(resJson => {
              authDispatch({
                  type: "LOGIN",
                  payload: resJson
              })
      }).catch(error => {
          setData({
              ...data,
              isSubmitting: false,
              errorMessage: error.message || error.statusText
          });
      });
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
    <SignUp></SignUp>
  );
};
  
export default SignUp;