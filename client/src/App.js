import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewAccount from "./pages/NewAccount";
import RideList from "./pages/RideList";
import RideDetails from "./pages/RideDetails";
import UpdateReview from "./pages/UpdateReview";

import AddReview from "./pages/AddReview";
import { useEffect, useState } from "react";
function App() {
  const [userObjectId, updateUserObjectId] = useState("");

  return (
    <div className="App">
      <header>
        <Header userObjectId={userObjectId} />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<Home new="true" />} />
          <Route path="/new/:userId/:name" element={<NewAccount />} />
          <Route
            path="/account/:userId/rides"
            element={<RideList updateUser={updateUserObjectId} />}
          />
          <Route
            path="/account/:userId/rides/:rideId"
            element={<RideDetails />}
          />
          <Route
            path="/account/:userId/addReview"
            element={<AddReview updateUser={updateUserObjectId} />}
          />
          <Route
            path="updateReview/:reviewId/:userId"
            element={<UpdateReview />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
