import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Review from "../components/Review";

const RideDetails = (props) => {
  let { id, userId, rideId } = useParams();
  let reviewToRender = <div></div>;

  const [rideDetails, setRideDetails] = useState();
  const [currentUser, updateCurrentUser] = useState("");
  const [reviews, setReview] = useState([]);
  const [needReload, setNeedReload] = useState(true);

  const getRideDetails = async () => {
    const ride = await axios.get(`/api/ride/${rideId}`);
    setRideDetails(ride.data.ride);
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
  const getReviews = async () => {
    const response = await axios.get(
      `/api/user/${userId}/rides/review/${rideId}`
    );
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
        `/api/user/${userId}/rides/review/${reviewId}`
      );
      setNeedReload(true);
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
          <section>
            <img
              src={rideDetails.image}
              alt={rideDetails.name}
              className="image-box"
            />
          </section>
          <div className="location-and-height">
            <section className="location">
                <h3>Location: </h3>
                <p>{rideDetails.location}</p>
            </section>
            <section className="height">
                <h3>Height Requirement: </h3>
                <p>{rideDetails.heightRequirement}</p>
            </section>
           </div>
          <div className="description">
            <h3>{rideDetails.description}</h3>
          </div>

          <h2 className='review-header'>Reviews</h2>
        
        
          {reviews.map((review) => (
            <div key={review._id} className="reviews">
              <Review
                key={review._id}
                data={review}
                currentUserId={currentUser._id}
                comment={review.comment}
                date={review.date}
                handleRemove={removeComment}
              />
            </div>
          ))}
        </div>
      ) : (
        <h1>Next in queue...</h1>
      )}
    </div>
  );
};
export default RideDetails;
