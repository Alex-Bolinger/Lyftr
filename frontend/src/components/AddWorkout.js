import React, { useContext, useState } from 'react'
import { Button, FormControl, Input, InputLabel } from '@mui/material'
import { WorkoutContext } from './Home'
import { AuthContext } from '../App'

const AddWorkout = () => {
  const { state: authState } = useContext(AuthContext)
  const { workoutState, workoutDispatch } = useContext(WorkoutContext)

  const [name, setName] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [activities, setActivities] = useState([])

  // const isButtonDisabled = name === '' || startTime === '' || endTime === '' || activities === [] || workoutState.isWorkoutSubmitting

  const onSubmit = () => {
    workoutDispatch({
      type: 'ADD_WORKOUT_REQUEST'
    })
    const workout = {
      name,
      startTime,
      endTime,
      activities
    }
    fetch('http://127.0.0.1/api/workouts', {
      method: 'POST',
      headers: {
        Authorization: `${authState.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(workout)
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw res
        }
      })
      .then(data => {
        console.log(data)
        setName('')
        setStartTime('')
        setEndTime('')
        setActivities([])
        workoutDispatch({
          type: 'ADD_WORKOUT_SUCCESS',
          payload: data
        })
      }).catch(error => {
        workoutDispatch({
          type: 'ADD_WORKOUT_FAILURE'
        })
        console.log(error)
      })
  }

  const [formFields, setFormFields] = useState([
    { name: '', age: '' }
  ])

  const handleFormChange = (event, index) => {
    const data = [...formFields]
    data[index][event.target.name] = event.target.value
    setFormFields(data)
  }

  const addFields = () => {
    const object = {
      name: '',
      age: ''
    }

    setFormFields([...formFields, object])
  }

  return (
        <div>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input id="name" name="name" type="text" value={name} onChange={e => setName(e.target.value)} className="text-input"/>

                                 <InputLabel htmlFor="startTime">Start Time</InputLabel>
                                     <Input
                                     id="startTime"
                                     name="startTime"
                                     type="datetime-local"
                                     value={startTime}
                                     onChange={e => setStartTime(e.target.value)}
                                     />

                                 <InputLabel htmlFor="endTime">End Time</InputLabel>
                                     <Input
                                     id="endTime"
                                     name="endTime"
                                     type="datetime-local"
                                     value={endTime}
                                     onChange={e => setEndTime(e.target.value)}
                                     />

                {formFields.map((field, index) => {
                  return (
                            <div key={index}>
                                <Input
                                    name="workoutName"
                                    placeholder="Workout Name"
                                    onChange={event => handleFormChange(event, index)}
                                    value={field.exerciseName}
                                />
                                <Input
                                    name="sets"
                                    placeholder="Number of sets"
                                    onChange={event => handleFormChange(event, index)}
                                    value={field.sets}
                                />
                                <Input
                                    name="reps"
                                    placeholder="Number of reps per set"
                                    onChange={event => handleFormChange(event, index)}
                                    value={field.reps}
                                />
                            </div>
                  )
                })}
            <Button onClick={addFields}>Add More..</Button>
            <br />
            <Button onClick={onSubmit}>Submit</Button>
        </div>
  )
}

export default (AddWorkout)