import React from 'react'
import { GlobalContext } from '../App'

export const Header = () => {
  const { globalState, globalDispatch } = React.useContext(GlobalContext)
  return (
    <nav id="navigation">
      <h1 href="#" className="logo">
        Lyftr
      </h1>
      <button
        onClick={() =>
          globalDispatch({
            type: 'PROFILE'
          })}>
            {globalState.isAuthenticated && (
              <h1>Profile</h1>
            )}
      </button>
      <button
        onClick={() =>
          globalDispatch({
            type: 'SIGNUPSCREEN'
          })}>
        {!globalState.isAuthenticated && (
          <h1>Sign Up</h1>
        )}
        </button>

      <button
        onClick={() =>
          globalDispatch({
            type: 'LOGINSCREEN'
          })}>
        {!globalState.isAuthenticated && (
          <h1>Login</h1>
        )}
        </button>

      <button
        onClick={() =>
          globalDispatch({
            type: 'LOGOUT'
          })
        }
      >
        {globalState.isAuthenticated && (
          <h1>LOGOUT</h1>
        )}
      </button>
    </nav>
  )
}

export default Header
