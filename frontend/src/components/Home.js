import React from 'react'
import { GlobalContext } from '../App'
import Dashboard from './dashboard/Dashboard'
import Card from './Workout'

export const Home = () => {
  const { globalState, globalDispatch } = React.useContext(GlobalContext)

  React.useEffect(() => {
    globalDispatch({
      type: 'FETCH_WORKOUTS_REQUEST'
    })
    fetch('http://localhost:3001/api/workouts', {
      headers: {
        Authorization: globalState.token
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
        globalDispatch({
          type: 'FETCH_WORKOUTS_SUCCESS',
          payload: resJson
        })
      })
      .catch(error => {
        console.log(error)
        globalDispatch({
          type: 'FETCH_WORKOUTS_FAILURE'
        })
      })
  }, [globalState.token])

  return (
    <React.Fragment>
    <div className="home">
      {globalState.isFetching
        ? (
        <span className="loader">LOADING...</span>
          )
        : globalState.hasError
          ? (
        <span className="error">AN ERROR HAS OCCURED</span>
            )
          : globalState.workouts.length === 0
            ? (
              <h1>No workouts logged!</h1>
              )
            : (
        <div>
          {/* {globalState.workouts.length > 0 && */}
          {/*    globalState.workouts.map(workout => ( */}
          {/*    <Card key={workout.id.toString()} workout={workout} /> */}
          {/*    ))} */}
          <Dashboard></Dashboard>
        </div>
              )}
    </div>
    </React.Fragment>
  )
}

export default Home
