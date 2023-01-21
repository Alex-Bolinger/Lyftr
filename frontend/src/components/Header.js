import React from 'react'
import { AuthContext } from '../App'

export const Header = () => {
  const { state, dispatch } = React.useContext(AuthContext)
  return (
    <nav id="navigation">
      <h1 href="#" className="logo">
        Lyftr
      </h1>
      <button
        onClick={() =>
          dispatch({
            type: 'PROFILE'
          })}>
            {state.isAuthenticated && (
              <h1>Profile</h1>
            )}
      </button>
      <button
        onClick={() =>
          dispatch({
            type: 'SIGNUPSCREEN'
          })}>
        {!state.isAuthenticated && (
          <h1>Sign Up</h1>
        )}
        </button>

      <button
        onClick={() =>
          dispatch({
            type: 'LOGINSCREEN'
          })}>
        {!state.isAuthenticated && (
          <h1>Login</h1>
        )}
        </button>

      <button
        onClick={() =>
          dispatch({
            type: 'LOGOUT'
          })
        }
      >
        {state.isAuthenticated && (
          <h1>LOGOUT</h1>
        )}
      </button>
    </nav>
  )
}

export default Header
