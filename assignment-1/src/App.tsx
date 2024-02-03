import "./App.css";
import Home from "./home-page/Home";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { SpotDetails } from "./spot-details/SpotDetails";
import "react-calendar/dist/Calendar.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/spot/:id' Component={SpotDetails}></Route>
        <Route path='/' Component={Home}></Route>
      </Routes>
    </Router>
  );
}

export default App;
