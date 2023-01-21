import React from 'react'

export const Card = ({ workout }) => {
  return (
    <div className="card">
      <img
        src={workout.picture_link}
        alt=""
      />
      <div className="content">
        <h2>{workout.name}</h2>
        <span>BY: {workout.name}</span>
      </div>
    </div>
  )
}

export default Card
