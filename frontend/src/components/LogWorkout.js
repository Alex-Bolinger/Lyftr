import React, { useContext, useState } from 'react'
import { Grid, Paper, Button, Input, InputLabel } from '@mui/material'
import { GlobalContext } from '../App'

const LogWorkout = () => {
  const { globalState, globalDispatch } = useContext(GlobalContext)

  const [name, setName] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [activities, setActivities] = useState([])

  // const isButtonDisabled = name === '' || startTime === '' || endTime === '' || activities === [] || workoutState.isWorkoutSubmitting

  const onSubmit = () => {
    globalDispatch({
      type: 'LOG_WORKOUT_REQUEST'
    })
    const workout = {
      user_id: globalState.user.id,
      name,
      startTime,
      endTime,
      activities
    }
    fetch('http://127.0.0.1:3001/api/workouts', {
      method: 'POST',
      headers: {
        Authorization: `${globalState.token}`,
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
        globalDispatch({
          type: 'LOG_WORKOUT_SUCCESS',
          payload: data
        })
      }).catch(error => {
        globalDispatch({
          type: 'LOG_WORKOUT_FAILURE'
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
        <Paper elevation={12} style={{ borderRadius: '10px', width: '50%', margin: 'auto' }}>
            <Grid direction="row" xs={{ flexGrow: 1 }} container spacing={2}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" align="center" spacing={2}>
                        <Grid item xs={12}>
                            <InputLabel htmlFor="name">Name</InputLabel>
                            <Input id="name" name="name" type="text" value={name} onChange={e => setName(e.target.value)} className="text-input"/>
                        </Grid>
                        <Grid item xs={4}>
                            <InputLabel htmlFor="startTime">Start Time</InputLabel>
                            <Input
                                id="startTime"
                                name="startTime"
                                type="datetime-local"
                                value={startTime}
                                onChange={e => setStartTime(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <InputLabel htmlFor="endTime">End Time</InputLabel>
                            <Input
                                id="endTime"
                                name="endTime"
                                type="datetime-local"
                                value={endTime}
                                onChange={e => setEndTime(e.target.value)}
                            />
                        </Grid>
                        {formFields.map((field, index) => {
                          return (
                                <Grid key={index} justifyContent="center" padding="20px" container xs={12}>
                                    <Grid item xs={3}>
                                        <Input
                                            name="workoutName"
                                            placeholder="Workout Name"
                                            onChange={event => handleFormChange(event, index)}
                                            value={field.exerciseName}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Input
                                            name="sets"
                                            placeholder="Number of sets"
                                            onChange={event => handleFormChange(event, index)}
                                            value={field.sets}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Input
                                            name="reps"
                                            placeholder="Number of reps per set"
                                            onChange={event => handleFormChange(event, index)}
                                            value={field.reps}
                                        />
                                    </Grid>
                                </Grid>
                          )
                        })}
                        <Grid item xs={12} padding="20px">
                            <Button onClick={addFields}>Add More Activities...</Button>
                            <Button onClick={onSubmit}>Submit</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
  )
}

export default (LogWorkout)
