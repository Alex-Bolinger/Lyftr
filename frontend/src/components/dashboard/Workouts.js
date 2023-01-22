import * as React from 'react'
import Link from '@mui/material/Link'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Title from './Title'
import { GlobalContext } from '../../App'
import { getDateTimeString } from '../helpers'

function preventDefault (event) {
  event.preventDefault()
}

export default function Workouts () {
  const { globalState, globalDispatch } = React.useContext(GlobalContext)

  const tableVals = []
  let tableKey = 1
  for (const workout in globalState.workouts) {
    let totalSets = 0
    let biggestLift = null
    let biggestLiftActivity = 0
    for (const activity in globalState.workouts[workout].activities) {
      totalSets = totalSets + globalState.workouts[workout].activities[activity].sets
      const totalActivity = globalState.workouts[workout].activities[activity].sets * globalState.workouts[workout].activities[activity].reps
      if (biggestLift == null || biggestLiftActivity < totalActivity) {
        biggestLift = globalState.workouts[workout].activities[activity].exercise.name
        biggestLiftActivity = totalActivity
      }
    }
    tableVals.push({
      key: tableKey,
      date_time: getDateTimeString(new Date(Date.parse(globalState.workouts[workout].start_time))),
      name: globalState.workouts[workout].name,
      biggest_lift: biggestLift,
      total_lifts: globalState.workouts[workout].activities.length,
      total_sets: totalSets
    })
    tableKey = tableKey + 1
  }

  return (
    <React.Fragment>
      <Title>Recent Workouts</Title>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Date / Time</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Biggest Lift</TableCell>
            <TableCell>Total Lifts</TableCell>
            <TableCell align="right">Total Sets</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableVals.map((workout) => (
            <TableRow key={workout.key}>
              <TableCell>{workout.date_time}</TableCell>
              <TableCell>{workout.name}</TableCell>
              <TableCell>{workout.biggest_lift}</TableCell>
              <TableCell>{workout.total_lifts}</TableCell>
              <TableCell align="right">{workout.total_sets}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  )
}
