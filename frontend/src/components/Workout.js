import React from 'react'
import { Grid, Paper } from '@mui/material'

export const Workout = ({ workout }) => {
  return (
    <Paper elevation={12} style={{ marginBottom: '30px', height: '150px', width: '90%', margin: 'auto', textAlign: 'center', verticalAlign: 'baseline' }}>
        <h2 style={{ display: 'inline' }}>{workout.name}</h2>
    </Paper>
  )
}

export default Workout
