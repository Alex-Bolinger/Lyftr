import React from 'react'
import './App.css'
import Login from './components/Login'
import Home from './components/Home'
import Header from './components/Header'
import SignUp from './components/SignUp'
import Profile from './components/Profile'
import LogWorkout from './components/LogWorkout'
import { Grid } from '@mui/material'

// Auth state context
const globalInitialState = {
  isAuthenticated: false,
  log: false,
  user: null,
  token: null,
  login: true,
  profile: false,
  workouts: [],
  isFetching: false,
  hasError: false,
  isWorkoutSubmitting: false,
  workoutHasError: false
}
export const GlobalContext = React.createContext(globalInitialState)

// Global reducer
const globalReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      localStorage.setItem('token', JSON.stringify(action.payload.token))
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      }
    case 'LOGOUT':
      localStorage.clear()
      return {
        ...state,
        isAuthenticated: false,
        user: null
      }
    case 'SIGNUP':
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      localStorage.setItem('token', JSON.stringify(action.payload.token))
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      }
    case 'LOGINSCREEN':
      return {
        ...state,
        login: true,
        profile: false,
        log: false
      }
    case 'SIGNUPSCREEN':
      return {
        ...state,
        login: false,
        profile: false,
        log: false
      }
    case 'PROFILE':
      return {
        ...state,
        profile: true,
        log: false
      }
    case 'LOG':
      return {
        ...state,
        log: true,
        profile: false
      }
    case 'FETCH_WORKOUTS_REQUEST':
      return {
        ...state,
        isFetching: true,
        hasError: false
      }
    case 'FETCH_WORKOUTS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        workouts: action.payload
      }
    case 'FETCH_WORKOUTS_FAILURE':
      return {
        ...state,
        hasError: true,
        isFetching: false
      }
    case 'LOG_WORKOUT_REQUEST':
      return {
        ...state,
        isWorkoutSubmitting: true,
        workoutHasError: false
      }
    case 'LOG_WORKOUT_SUCCESS':
      return {
        ...state,
        isWorkoutSubmitting: false,
        workouts: [...state.workouts, action.payload]
      }
    case 'LOG_WORKOUT_FAILURE':
      return {
        ...state,
        isWorkoutSubmitting: false,
        workoutHasError: true
      }
    default:
      return state
  }
}

function App () {
  const [globalState, globalDispatch] = React.useReducer(globalReducer, globalInitialState)

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || null)
    const token = JSON.parse(localStorage.getItem('token') || null)

    if (user && token) {
      globalDispatch({
        type: 'LOGIN',
        payload: {
          user,
          token
        }
      })
    }
  }, [])
  return (
    <GlobalContext.Provider
      value={{
        globalState,
        globalDispatch
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12} style={{ paddingTop: '100px' }}>
          <div className="App">{!globalState.isAuthenticated ? globalState.login ? <Login /> : <SignUp /> : globalState.profile ? <Profile /> : globalState.log ? <LogWorkout/> : <Home />}</div>
        </Grid>
      </Grid>
    </GlobalContext.Provider>
  )
}

export default App
