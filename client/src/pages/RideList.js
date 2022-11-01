import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const RideList = () => {
  // Variables
  const [currentUser, updateCurrentUser] = useState("");
  const { userId } = useParams();
  let toRender = (
    <div>
      <h5>Id is not valid, please create a new user account</h5>
      <Link to="/new">Create account page</Link>
    </div>
  );

  // Functions
  const getCurrentUser = async (id) => {
    const userObject = await axios
      .get(`http://localhost:3001/api/user/${id}`)
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
    }
  }, []);

  // Conditional formatting
  if (currentUser.userName) {
    toRender = (
      <div>
        <h2>Welcome {currentUser.userName}</h2>
        <div>Please select the ride you want to check.</div>
      </div>
    );
  }

  return toRender;
};

export default RideList;
