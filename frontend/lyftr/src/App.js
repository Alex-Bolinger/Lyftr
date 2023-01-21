import React from "react";
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Profile from './pages/profile';
import Login from './pages/login';
import SignUp from './pages/signup';
import Home from "./pages/home";
import Navbar from "./pages/components/Navbar/index";

// Auth state
const initialAuth = {
  isAuthenticated: false,
  user: null,
  access_token: null
}
export const AuthContext = React.createContext(initialAuth);

// Auth reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("access_token", JSON.stringify(action.payload.access_token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.access_token
      };
    case "LOGOUT":
      localStorage.clear()
          return {
            ...state,
            isAuthenticated: false,
            user: null
          }
    default: return state;
  }
}

function App() {
  // Set up auth state / dispatch
  const [authState, authDispatch] = React.useReducer(reducer, initialAuth);
  return (
      <AuthContext.Provider value={{authState, authDispatch}}>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}>
            <Route path="profile" element={<Profile/>}></Route>
            <Route path="login" element={<Login/>}></Route>
            <Route path="signup" element={<SignUp/>}></Route>
          </Route>
        </Routes>
      </AuthContext.Provider>
  );
}

export default App;
