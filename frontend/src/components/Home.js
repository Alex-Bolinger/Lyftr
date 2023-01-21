import React from 'react'
import { AuthContext } from '../App'
import Card from './Card'
import AddWorkout from './AddWorkout'

const initialWorkoutState = {
  workouts: [],
  isFetching: false,
  hasError: false,
  isWorkoutSubmitting: false,
  workoutHasError: false
}
export const WorkoutContext = React.createContext(initialWorkoutState)

const reducer = (state, action) => {
  switch (action.type) {
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
    case 'ADD_WORKOUT_REQUEST':
      return {
        ...state,
        isWorkoutSubmitting: true,
        workoutHasError: false
      }
    case 'ADD_WORKOUT_SUCCESS':
      return {
        ...state,
        isWorkoutSubmitting: false,
        workouts: [...state.workouts, action.payload]
      }
    case 'ADD_WORKOUT_FAILURE':
      return {
        ...state,
        isWorkoutSubmitting: false,
        workoutHasError: true
      }
    default:
      return state
  }
}

export const Home = () => {
  const { state: authState } = React.useContext(AuthContext)
  const [workoutState, workoutDispatch] = React.useReducer(reducer, initialWorkoutState)
  const [isAddWorkoutModalVisible, setAddWorkoutModalVisible] = React.useState(false)

  const toggleAddWorkout = () => {
    setAddWorkoutModalVisible(!isAddWorkoutModalVisible)
  }

  React.useEffect(() => {
    workoutDispatch({
      type: 'FETCH_WORKOUTS_REQUEST'
    })
    fetch('http://127.0.0.1:3001/api/workouts', {
      headers: {
        Authorization: `${authState.token}`
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw res
        }
      })
      .then(resJson => {
        console.log(resJson)
        workoutDispatch({
          type: 'FETCH_WORKOUTS_SUCCESS',
          payload: resJson
        })
      })
      .catch(error => {
        console.log(error)
        workoutDispatch({
          type: 'FETCH_WORKOUTS_FAILURE'
        })
      })
  }, [authState.token])

  return (
    <React.Fragment>
    <WorkoutContext.Provider value={{
      workoutState,
      workoutDispatch
    }}>
      <button className="toggle-button" onClick={toggleAddWorkout}>ADD WORKOUT</button>
      <AddWorkout onClose={toggleAddWorkout} show={isAddWorkoutModalVisible} />
    </WorkoutContext.Provider>
    <div className="home">
      {workoutState.isFetching
        ? (
        <span className="loader">LOADING...</span>
          )
        : workoutState.hasError
          ? (
        <span className="error">AN ERROR HAS OCCURED</span>
            )
          : (
        <>
          {workoutState.workouts.length > 0 &&
              workoutState.workouts.map(workout => (
              <Card key={workout.id.toString()} workout={workout} />
              ))}
        </>
            )}
    </div>
    </React.Fragment>
  )
}

export default Home
