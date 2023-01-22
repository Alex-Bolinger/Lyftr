import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts'
import Title from './Title'
import { GlobalContext } from '../../App'

export default function Chart () {
  const theme = useTheme()
  const { globalState, globalDispatch } = React.useContext(GlobalContext)

  // Transform data so that x axis is the workout and y axis is the sum of all the activities
  const data = []
  let workoutCount = 1
  for (const workout in globalState.workouts) {
    let cumulativeActivity = 0
    console.log(workout)
    for (const activity in globalState.workouts[workout]) {
      console.log(activity)
      cumulativeActivity = cumulativeActivity + (globalState.workouts[workout][activity].sets * globalState.workouts[workout][activity].reps)
    }
    data.push({
      workoutCount,
      cumulativeActivity
    })
    workoutCount = workoutCount + 1
  }
  console.log(data)

  return (
    <React.Fragment>
      <Title>Total Activity over Time</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1
              }}
            >
              Sales ($)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  )
}
