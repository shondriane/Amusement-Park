import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  // Variables

  let toRender = <div></div>;
  let submitButton = (
    <input disabled type="submit" value="Create new account" />
  );

  const [userId, updateUserId] = useState("");
  const [userFormState, updateUserForm] = useState({
    userName: ""
  });

  const [viewMode, updateViewMode] = useState("No ID");

  // Functions
  const goCreateAccount = () => {
    updateViewMode("Account Creation");
  };

  const handleChange = (e) => {
    updateUserForm({ ...userFormState, [e.target.id]: e.target.value });
  };

  const createAccount = async (e) => {
    e.preventDefault();
    const newUser = await axios
      .post(`http://localhost:3001/user`, userFormState)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(error);
      });
    updateUserForm({
      userName: ""
    });
  };

  useEffect(() => {
    if (userId && viewMode !== "Account Creation") {
      updateViewMode("User Home");
    } else if (!userId && viewMode !== "Account Creation") {
      updateViewMode("No ID");
    }
  }, []);

  // Conditional Rendering
  if (userFormState.userName) {
    submitButton = (
      <input className="click-able" type="submit" value="Create new account" />
    );
  }

  if (viewMode === "No ID") {
    toRender = (
      <div>
        <div>Hello, you need to have an account first</div>
        <button onClick={goCreateAccount}>Create Account</button>
      </div>
    );
  } else if (viewMode === "User Home") {
    toRender = <div>Welcome user {userId}</div>;
  } else if (viewMode === "Account Creation") {
    toRender = (
      <div>
        <form>
          <label>Username: </label>
          <input
            type="text"
            placeholder="Username"
            id="userName"
            value={userFormState.userName}
            onChange={handleChange}
          />
          {submitButton}
        </form>
      </div>
    );
  }

  return toRender;
};

export default Home;
