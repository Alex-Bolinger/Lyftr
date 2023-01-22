import * as React from 'react'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Title from './Title'
import { GlobalContext } from '../../App'
import { getDateString } from '../helpers'

function preventDefault (event) {
  event.preventDefault()
}

export default function Stats () {
  const { globalState, globalDispatch } = React.useContext(GlobalContext)

  return (
    <React.Fragment>
      <Title>Total Workouts</Title>
      <Typography component="p" variant="h4">
          {globalState.workouts.length}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Most recent: {getDateString(new Date(Date.parse(globalState.workouts[globalState.workouts.length - 1].start_time)))}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View your stats
        </Link>
      </div>
    </React.Fragment>
  )
}
