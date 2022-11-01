import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewAccount from "./pages/NewAccount";
import RideList from "./pages/RideList";

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
          <Route path="account/:userId/rides" element={<RideList />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
