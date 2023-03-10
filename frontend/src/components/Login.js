import React from 'react'
import logo from '../logo.svg'
import { GlobalContext } from '../App'

export const Login = () => {
  const { globalState, globalDispatch } = React.useContext(GlobalContext)
  const initialState = {
    email: '',
    password: '',
    isSubmitting: false,
    errorMessage: null
  }

  const [data, setData] = React.useState(initialState)

  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }

  const handleFormSubmit = event => {
    event.preventDefault()
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null
    })
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    const raw = JSON.stringify({
      email: data.email,
      password: data.password
    })

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }
    fetch('http://127.0.0.1:3001/api/login', requestOptions)
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw res
        }
      }).then(resJson => {
        globalDispatch({
          type: 'LOGIN',
          payload: resJson
        })
      }).catch(error => {
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error.message || error.statusText
        })
      })
  }

  return (
    <div className="login-container">
      <div className="card">
        <div className="container">
          <form onSubmit={handleFormSubmit}>
            <h1>Login</h1>
            <label htmlFor="email">
              Email Address
              <input
                type="text"
                value={data.email}
                onChange={handleInputChange}
                name="email"
                id="email"
              />
            </label>

            <label htmlFor="password">
              Password
              <input
                type="password"
                value={data.password}
                onChange={handleInputChange}
                name="password"
                id="password"
              />
            </label>

            {data.errorMessage && (
              <span className="form-error">{data.errorMessage}</span>
            )}

            <button disabled={data.isSubmitting}>
              {data.isSubmitting
                ? (
                <img className="spinner" src={logo} alt="loading icon" />
                  )
                : (
                    'Login'
                  )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
