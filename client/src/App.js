import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewAccount from "./pages/NewAccount";
import RideList from "./pages/RideList";
import RideDetails from "./pages/RideDetails"

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<Home new="true" />} />
          <Route path="/new/:userId/:name" element={<NewAccount />} />
          <Route path="/account/:userId/rides" element={<RideList />} />
          <Route path="/account/:userId/rides/:rideId" element={<RideDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
