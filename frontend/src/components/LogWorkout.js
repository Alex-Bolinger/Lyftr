import React, { useContext, useState } from 'react'
import { Grid, Paper, Button, Input, InputLabel } from '@mui/material'
import { GlobalContext } from '../App'

const LogWorkout = () => {
  const { globalState, globalDispatch } = useContext(GlobalContext)

  const [name, setName] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [activities, setActivities] = useState([{
    exercise: {
      name: null
    },
    sets: null,
    reps: null
  }])

  // const isButtonDisabled = name === '' || startTime === '' || endTime === '' || activities === [] || workoutState.isWorkoutSubmitting

  const onSubmit = () => {
    globalDispatch({
      type: 'LOG_WORKOUT_REQUEST'
    })
    const workout = {
      user_id: globalState.user.id,
      name,
      start_time: startTime,
      end_time: endTime,
      activities
    }
    console.log(workout)
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

  const handleFormChange = (event, index) => {
    const data = [...activities]
    data[index][event.target.name] = event.target.value
    setActivities(data)
  }

  const addFields = () => {
    const object = {
      exercise: {
        name: null
      },
      sets: null,
      reps: null
    }

    setActivities([...activities, object])
  }

  return (
        <Paper elevation={12} style={{ borderRadius: '10px', minWidth: '750px', width: '60%', margin: 'auto', marginTop: '100px' }}>
            <Grid direction="row" container spacing={2}>
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
                        {activities.map((field, index) => {
                          return (
                                <Grid key={index} justifyContent="center" padding="20px" container spacing={2}>
                                    <Grid item xs={3}>
                                        <Input
                                            name="exercise.name"
                                            placeholder="Exercise"
                                            onChange={event => handleFormChange(event, index)}
                                            value={field.exercise.name}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Input
                                            name="sets"
                                            placeholder="Sets"
                                            onChange={event => handleFormChange(event, index)}
                                            value={field.sets}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Input
                                            name="reps"
                                            placeholder="Reps per set"
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
