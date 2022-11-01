import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Review from "../components/Review";

const RideDetails = (props) => {
  let { id, userId, rideId } = useParams();
  let navigate = useNavigate();

  const [rideDetails, setRideDetails] = useState();
  const [currentUser, updateCurrentUser] = useState("");
  const [reviews, setReview] = useState([]);

  const getRideDetails = async () => {
    const ride = await axios.get(`http://localhost:3001/api/ride/${rideId}`);
    setRideDetails(ride.data.ride);
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
  const getReviews = async () => {
    const response = await axios.get(
      `http://localhost:3001/api/user/${userId}/rides/review/${rideId}`
    );
    console.log("is this working", response);
    setReview(response.data.review);
  };

  useEffect(() => {
    getRideDetails();
    getCurrentUser(userId);
    getReviews();
  }, [id]);

  console.log("this is my review", reviews);
  return (
    <div className="deets">
      {rideDetails ? (
        <div className="ride-details">
          <div>
            <h1 id="ride-name">{rideDetails.name}</h1>
          </div>
          <section className="image-box">
            <img src={rideDetails.image} alt={rideDetails.name} />
          </section>
          <section className="location">
            <h3>Location: </h3>
            <p>{rideDetails.location}</p>
          </section>
          <section className="height">
            <h3>Height Requirement: </h3>
            <p>{rideDetails.heightRequirement}</p>
          </section>
          <div>
            <h3>{rideDetails.description}</h3>
          </div>

          {reviews.map((review) => (
            <Link to={`/review/${review._id}}`}>
              <Review
                key={review._id}
                name={currentUser.userName}
                comment={review.comment}
                date={review.date}
              />
            </Link>
          ))}
        </div>
      ) : (
        <h1>Not Found.</h1>
      )}
    </div>
  );
};
export default RideDetails;

// “name”:
// “image”:
// “location”:
// “heightRequirement”:
// “description”:
