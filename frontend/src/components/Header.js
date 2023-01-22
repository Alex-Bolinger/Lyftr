import React from 'react'
import { GlobalContext } from '../App'

export const Header = () => {
  const { globalState, globalDispatch } = React.useContext(GlobalContext)
  return (
    <nav id="navigation" style={{ justifyContent: 'space-between' }}>
        <div style={{ paddingLeft: '20px' }}>
            <a href="#" className="left brand-logo" style={{ display: 'inline-flex', height: '100%' }}>
                <h1>Lyftr</h1>
            </a>
        </div>
        <div style={{ paddingRight: '20px' }}>
            <button
                onClick={() =>
                  globalDispatch({
                    type: 'LOG'
                  })}>
                {globalState.isAuthenticated && (
                    <h1>Log Workout</h1>
                )}
            </button>
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
        </div>

    </nav>
  )
}

export default Header
