import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MoviesPage from "./components/MoviesPage";
import ReservationsPage from "./components/ReservationsPage";
function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/"  component={<Home />} />
        <Route path="/movies" component={<MoviesPage />} />
        <Route path="/reservations" component={<ReservationsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
