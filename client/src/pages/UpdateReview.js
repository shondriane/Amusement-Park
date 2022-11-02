import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateReview = (props) => {
  // //variables
  const navigate = useNavigate();
  const initialState = {
    userId: "",
    date: "",
    rideId: "",
    comment: ""
  };

  const [formState, setFormState] = useState(initialState);
  const [currentUser, updateCurrentUser] = useState("");
  const [currentRide, setCurrentRide] = useState("");
  const [rides, setRides] = useState([]);
  const { reviewId, userId } = useParams();

  //functions
  const getRideComment = async () => {
    const rides = await axios.get(`/api/review/${reviewId}`);
    setCurrentRide(rides.data);
    setFormState(rides.data);
  };

  const getRideList = async () => {
    const rides = await axios.get("/api/allrides");
    setRides(rides.data.ride);
  };

  const getCurrentUser = async (id) => {
    const userObject = await axios
      .get(`/api/user/${userId}`)
      .then((response) => {
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
      setFormState({ ...formState, ["userId"]: userId });
      getRideComment();
      getRideList();
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:3001/api/review/${reviewId}`, formState);
    setFormState(initialState);

    navigate(-1);
  };

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.id]: event.target.value });
  };

  return (
    <div className="formContainer">
      <div className="formDiv-2">
        <h1>Update Review</h1>
        <label htmlFor="name">{currentUser.userName}</label>
        <label>Date:</label>
        <input
          type="date"
          id="date"
          onChange={handleChange}
          value={formState.date}
        />
        <label htmlFor="ride">Update Ride</label>
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
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateReview;
