import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const AddReview = () => {
  //variables
  const initialState = {
    userId: '',
    date: '',
    rideId: '',
    comment: ''
  }

  const [formState, setFormState] = useState(initialState)
  const [currentUser, updateCurrentUser] = useState('')
  const [rides, setRides] = useState([])
  const { userId } = useParams()

  //functions
  const getRideList = async () => {
    const rides = await axios.get('http://localhost:3001/api/allrides')
    console.log(rides)
    setRides(rides.data.ride)
  }

  const getCurrentUser = async (id) => {
    const userObject = await axios
      .get(`http://localhost:3001/account/${userId}`)
      .then((response) => {
        updateCurrentUser(response.data.userData)
        return response
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    if (userId.length === 24) {
      getCurrentUser(userId)
      getRideList()
    }
  }, [])

  const handleSubmit = (event) => {
    event.preventDefaut()
    axios.post('http://localhost:3001/api/review', formState)
    setFormState(initialState)
  }
  const handleChange=event=>{
    setFormState({...formState,[event.target.id]:event.target.value})
  }
  return (
    <div className="formContainer">
      <div className="formDiv">
        <h1>Creating New Review</h1>
        <label htmlFor="name">{currentUser}</label>
        <label>Date:</label>
        <input
          type="date"
          id="date"
          onChange={handleChange}
          value={formState.date}
        />
        <select id="ride" onChange={handleChange} value={formState.rideId}>
          <label htmlFor="ride">Add Ride</label>
          <option defaultValue="select ride">Select Ride</option>
          {rides.map((ride) => (
            <option value={ride._id}>{ride.name}</option>
          ))}
        </select>
        <label htmlFor="comment">Comment</label>
        <textarea
          id="description"
          cols="30"
          rows="10"
          onChange={handleChange}
          value={formState.comment}
        ></textarea>
        <button onClick={handleSubmit} type="submit" className="send">
          Send
        </button>
      </div>
    </div>
  )
}

export default AddReview
