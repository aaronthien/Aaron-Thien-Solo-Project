import React from 'react'
import { useState } from 'react'

function ActivityListItem({activity, startTime, endTime, description, _id, handleDeleteButton}) {




  return (
    <div className='activityListItem'>
        <ul>
            <li>Activity: {activity}</li>
            <li>Start Time: {startTime}</li>
            <li>End Time: {endTime}</li>
            <li>Description: {description}</li>
            <li>ID: {_id} </li>
            <button onClick={ () => handleDeleteButton(_id)}>Delete Activity</button>
        </ul>
    </div>
  )
}

export default ActivityListItem