import React from 'react'
import { AuthContext } from '../App'
import Card from './Card'

const initialProfileState = {
  name: '',
  picture_link: ''
}

const ProfileContext = React.createContext(initialProfileState)

const reducer = (state, action) => {
  switch (action.type) {
    case 'PROFILESUCCESS':
      console.log(action)
      document.getElementById('profile_pic').src = action.payload.picture_link
      document.getElementById('full_name').innerHTML = action.payload.full_name
      return {
        ...state

      }

    default:
      return state
  }
}

export const Home = () => {
  const { state: authState } = React.useContext(AuthContext)
  const [profileState, profileDispatch] = React.useReducer(reducer, initialProfileState)

  React.useEffect(() => {
    fetch('http://127.0.0.1:3001/api/profiles?id=' + authState.user.profile_id, {
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
      }).then(result => {
        console.log(result)
        profileDispatch({
          type: 'PROFILESUCCESS',
          payload: result
        })
      })
  }, [authState.token])

  return (
    <React.Fragment>

    <div className="profile">
      <img src="" id="profile_pic"/>
      <h1 className="fullName" id="full_name"></h1>
    </div>
    </React.Fragment>
  )
}

export default Home
