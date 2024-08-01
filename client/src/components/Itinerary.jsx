import React from 'react'
import { useState, useEffect } from 'react'
import ActivityListItem from './ActivityListItem.jsx';



function Itinerary() {
    const [activity, setActivity] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [description, setDescription] = useState('');

    const [activityList, setActivityList] = useState([]);
    // on load set fetch function iterate over info

    useEffect(() => {
      const fetchInitialData = async () => {// need async
        try {
          const response = await fetch('http://localhost:3000/', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          if (response.ok) {
            const allData = await response.json() // wait for the response to turn to.json first
            // console.log(allData[0])
            setActivityList([...activityList, ...allData])//data that were sending back is in json
          }
        }
        catch (err) {
          console.log(err);
        }
      }
      fetchInitialData();
    }, []);

    const handleDeleteButton = async (_id) => {
      try {
        const response = await fetch('http://localhost:3000/', {
          method: 'DELETE',
          body:JSON.stringify(
            {
              _id: _id
            },
          ),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (response.ok) {
          const newActivityList = activityList.filter((ele) => ele._id !== _id)
          setActivityList(newActivityList);
        }
      } catch(err) {
        console.log(err)
      }
    }




    const handleClicked = async (e) => {
      e.preventDefault()
      try {
        const response = await fetch('http://localhost:3000/', { // updates/craete back end, also gets access to backend(equiv to postman)
          method: 'POST', // updates back end 
          body:JSON.stringify(
            {
              activity: activity,
              startTime: startTime,
              endTime: endTime,
              description: description
            },
          ),
          headers: {
            'Content-Type': 'application/json'
          }
        }) 
        // console.log(response);
        if (response.ok) { // checking if response is okay or true, if status code is between 200-300
          const _id = await response.json()
          console.log(_id)
          const newActivity = { // then create new obj passing in same data
              activity: activity,
              startTime: startTime,
              endTime: endTime,
              description: description,
              _id: _id
          }
          // setActivityList([...activityList, JSON.stringify(newActivity)]) 
          setActivityList([newActivity, ...activityList]) // just spreading out list(...)
        } // updating front end
      } catch(err) {
        console.log(err);
      }

      setActivity('');
      setStartTime('');
      setEndTime('');
      setDescription('');

    }
    const handleActivityChange = (e) => {
      setActivity(e.target.value);
    }
    const handleStartTimeChange = (e) => {
      setStartTime(e.target.value);
    }
    const handleEndTimeChange = (e) => {
      setEndTime(e.target.value);
    }
    const handleDescriptionChange = (e) => {
      setDescription(e.target.value);
    }

  return (
    <div>
        <div className='Box'>Itinerary</div>
        <form onSubmit={handleClicked}>
          <input type='text' placeholder='Activity' value={activity} onChange={handleActivityChange} required></input>
          <input type='text' placeholder='Start Time' value={startTime} onChange={handleStartTimeChange}></input>
          <input type='text' placeholder='End Time' value={endTime} onChange={handleEndTimeChange}></input>
          <input type='text' placeholder='Description' value={description} onChange={handleDescriptionChange} required></input>
          <button type='submit'>Submit</button>
        </form>
        {activityList.map((item, index) => (
          <ActivityListItem
          key={index}
          activity={item.activity}
          startTime={item.startTime}
          endTime={item.endTime}
          description={item.description}
          _id = {item._id}
          handleDeleteButton = {handleDeleteButton}
          />
        ))}
    </div>
  )
}

export default Itinerary

//txt file