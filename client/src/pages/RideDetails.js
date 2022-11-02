import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Review from "../components/Review";

const RideDetails = (props) => {
  let { id, userId, rideId } = useParams();
  const initialState = {
    userId: "",
    date: "",
    rideId: "",
    comment: ""
  };
  let reviewToRender = <div></div>;

  const [formState, setFormState] = useState(initialState);
  const [rideDetails, setRideDetails] = useState();
  const [currentUser, updateCurrentUser] = useState("");
  const [reviews, setReview] = useState([]);
  const [needReload, setNeedReload] = useState(true);
  const [needCurrentFormUpdate, setNeedCurrentFormUpdate] = useState(true);

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
    props.updateUser(userId);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    const newReview = await axios
      .post(`/api/review`, formState)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(error);
      });

    setFormState(initialState);
    setNeedReload(true);
  };

  const handleChange = (event) => {
    console.log(event.target.id);
    console.log(event.target.value);
    setFormState({ ...formState, [event.target.id]: event.target.value });
  };

  const initializeCurrentComment = () => {
    let currentDate = new Date();

    const year = currentDate.getUTCFullYear();
    const month = currentDate.getUTCMonth() + 1;
    const day = currentDate.getUTCDate();
    currentDate = [year, month, day].join("-");

    console.log(currentDate);
    setFormState({
      userId: userId,
      date: currentDate,
      rideId: rideId,
      comment: ""
    });
  };
  if (needCurrentFormUpdate) {
    initializeCurrentComment();
    setNeedCurrentFormUpdate(false);
  }

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

          <h2 className="review-header">Reviews</h2>

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
          <div className="comment-section">
            <label className="comment-heading" htmlFor="comment">Comment</label>
            <textarea
              id="comment"
              cols="30"
              rows="10"
              onChange={handleChange}
              value={formState.comment}
            ></textarea>
            <button onClick={handleSubmit} type="submit" className="send-2">
              Submit
            </button>
          </div>
        </div>
      ) : (
        <h1>Next in queue...</h1>
      )}
    </div>
  );
};
export default RideDetails;
