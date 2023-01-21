import React from "react";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Header from "./components/Header";
import SignUp from "./components/SignUp";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  login: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    case "SIGNUP":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    case "LOGINSCREEN":
      return {
        ...state,
        login: true
      };
    case "SIGNUPSCREEN":
      return {
        ...state,
        login: false
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || null)
    const token = JSON.parse(localStorage.getItem('token') || null)

    if(user && token){
      dispatch({
        type: 'LOGIN',
        payload: {
          user,
          token
        }
      })
    }
  }, [])
  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      <Header />
      <div className="App">{!state.isAuthenticated ? state.login ? <Login /> : <SignUp /> : <Home />}</div>
    </AuthContext.Provider>
  );
}

export default App;
