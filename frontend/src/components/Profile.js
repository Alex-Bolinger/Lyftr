import { Container } from '@mui/material'
import React from 'react'
import { GlobalContext } from '../App'
import Card from './Workout'

const initialProfileState = {
  name: '',
  picture_link: '',
  edit_mode: false
}
const ProfileContext = React.createContext(initialProfileState)

const reducer = (state, action) => {
  switch (action.type) {
    case 'PROFILESUCCESS':
      console.log(action)
      document.getElementById('profile_pic').src = action.payload.picture_link
      document.getElementById('full_name').innerHTML = action.payload.full_name
      return {
        ...state,
        name: action.payload.full_name,
        picture_link: action.payload.picture_link
      }
    case 'PROFILEEDIT':
      return {
        ...state,
        edit_mode: true
      }
    default:
      return state
  }
}

export const Home = () => {
  const { globalState, globalDispatch } = React.useContext(GlobalContext)
  const [profileState, profileDispatch] = React.useReducer(reducer, initialProfileState)

  const handleInputChange = event => {
    profileDispatch({
      ...profileState,
      [event.target.name]: event.target.value
    })
  }

  React.useEffect(() => {
    fetch('http://127.0.0.1:3001/api/profiles?id=' + globalState.user.profile_id, {
      headers: {
        Authorization: `${globalState.token}`
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw res
        }
      }).then(result => {
        console.log(result)
        profileDispatch({
          type: 'PROFILESUCCESS',
          payload: result
        })
      })
  }, [globalState.token])

  return (
    <React.Fragment>

    <div className="profile">
        <img src="" id="profile_pic"/>
        <h1 className="fullName" id="full_name"></h1>
        {!profileState.edit_mode && (
        <button onClick={() =>
          profileDispatch({
            type: 'PROFILEEDIT'
          })}>
            <h1>Edit</h1>
        </button>)}
        {profileState.edit_mode && (
            <label htmlFor="name">
            Name
            <input
              type="text"
              value={profileState.name}
              onChange={handleInputChange}
              name="name"
              id="name"
            />
            </label>
        )}
        {profileState.edit_mode && (
            <label htmlFor="picture_link">
            picture_link
            <input
              type="text"
              value={profileState.picture_link}
              onChange={handleInputChange}
              name="picture_link"
              id="picture_link"
            />
            </label>
        )}
    </div>
    </React.Fragment>
  )
}

export default Home
