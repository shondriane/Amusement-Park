import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";

const AddReview = (props) => {
  //variables
  const initialState = {
    userId: "",
    date: "",
    rideId: "",
    comment: ""
  };

  const [formState, setFormState] = useState(initialState);
  const [currentUser, updateCurrentUser] = useState("");
  const [rides, setRides] = useState([]);
  const { userId } = useParams();

  //functions
  const getRideList = async () => {
    const rides = await axios.get("http://localhost:3001/api/allrides");
    console.log(rides);
    setRides(rides.data.ride);
  };

  const getCurrentUser = async (id) => {
    const userObject = await axios

      .get(`http://localhost:3001/api/user/${userId}`)

      .then((response) => {
        console.log(response);
        updateCurrentUser(response.data.userData);

        return response;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (userId.length === 24) {
      getCurrentUser(userId);
      props.updateUser(userId);
      setFormState({ ...formState, ["userId"]: userId });
      getRideList();
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formState);
    axios.post("http://localhost:3001/api/review", formState);
    setFormState(initialState);

    Navigate(-1);
  };

  const handleChange = (event) => {
    console.log(event.target.id);
    console.log(event.target.value);
    setFormState({ ...formState, [event.target.id]: event.target.value });
  };

  return (
    <div className="formContainer">
      <div className="formDiv">
        <h1>Creating New Review</h1>

        <div className='form-review'>

        <label htmlFor="name" className="name">{currentUser.userName}</label>

        <label>Date:</label>
        <input
          type="date"
          id="date"
          onChange={handleChange}
          value={formState.date}
        />
        <label htmlFor="ride">Add Ride</label>
        <select id="rideId" onChange={handleChange} value={formState.rideId}>
          <option defaultValue="select ride">Select Ride</option>
          {rides.map((ride) => (
            <option key={ride._id} value={ride._id}>
              {ride.name}
            </option>
          ))}
        </select>
        <label htmlFor="comment">Comment</label>
        <textarea
          id="comment"
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
    </div>
  );
};

export default AddReview;
