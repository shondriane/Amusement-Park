import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Ride from "../components/Ride";

const RideList = (props) => {
  // Variables
  const [currentUser, updateCurrentUser] = useState("");
  const [rides, setRides] = useState([]);
  const { userId } = useParams();
  console.log(userId);
  let navigate = useNavigate();
  let toRender = (
    <div>
      <h5>Id is not valid, please create a new user account</h5>
      <Link to="/new">Create account page</Link>
    </div>
  );

  // Functions
  const getCurrentUser = async (id) => {
    const userObject = await axios
      .get(`/api/user/${id}`)
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
      props.updateUser(userId);
    }
  }, []);

  const getRideList = async () => {
    const rides = await axios.get("/api/allrides");
    console.log(rides);
    setRides(rides.data.ride);
  };

  const viewRideDetails = (userId, id) => {
    navigate(`/account/${userId}/rides/${id}`);
  };

  useEffect(() => {
    getRideList();
  }, []);

  // Conditional formatting
  if (currentUser.userName) {
    toRender = (
      <div>
        <h2>Welcome {currentUser.userName}</h2>
        <div>Please select the ride you want to check.</div>
        <div className="ride-list">
          <div className="ride-cards">
            {rides.map((result) => (
      
              <Ride
              
                key={result._id}
                user={userId}
                id={result._id}
                name={result.name}
                image={result.image}
                onClick={viewRideDetails}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return toRender;
};

export default RideList;
