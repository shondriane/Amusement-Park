import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Review from "../components/Review";

const RideDetails = (props) => {
  let { id, userId, rideId } = useParams();
  let navigate = useNavigate();
  let reviewToRender = <div></div>;

  const [rideDetails, setRideDetails] = useState();
  const [currentUser, updateCurrentUser] = useState("");
  const [reviews, setReview] = useState([]);
  const [needReload, setNeedReload] = useState(true);

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
  }, [id]);

  if (needReload) {
    getReviews();
    setNeedReload(false);
  }

  const removeComment = async (reviewId) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      const remove = await axios.delete(
        `http://localhost:3001/api/user/${userId}/rides/review/${reviewId}`
      );
      navigate(-1);
    }
  };

  reviewToRender = <div></div>;

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
            // <Link
            //   key={review._id}
            //   to={`/account/${userId}/rides/review/${review._id}/${rideId}}`}
            // >
            <div key={review._id}>
              <Review
                key={review._id}
                data={review}
                currentUserId={currentUser._id}
                comment={review.comment}
                date={review.date}
                handleRemove={removeComment}
              />
              {/* <button onClick={removeComment}> Remove</button>; */}
            </div>

            // </Link>
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
