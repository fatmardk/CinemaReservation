import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Public from "./Public";
import Private from "./Private";
import LoginAdmin from "../pages/auth/LoginAdmin";
import Dashboard from "../pages/auth/Dashboard";
import Home from "../pages/Home";
import AddMovie from "../pages/movies/AddMovie";
import UpdateMovie from "../pages/movies/UpdateMovie";
import MoviesPage from "../pages/movies/MoviesPage";
import ReservationsPage from "../pages/reservation/ReservationsPage";
import Showtimes from "../pages/showtimes/ShowTimes";
import CreateShowTime from "../pages/showtimes/CreateShowTime";
import ShowtimesByHall from "../pages/showtimes/ShowTimesByHall";
import MoviesWithShowtimes from "../pages/reservation/MoviesWithShowtimes";
import MakeReservation from "../pages/reservation/MakeReservation";
import SeatSelection from "../pages/reservation/SeatSelection";
import Filmler from "../pages/home/Filmler";
import FilmSalonlari from "../pages/home/FilmSalonlari";
import Rezervasyon from "../pages/home/Rezervasyon";
import HallsList from "../pages/showtimes/Hall";
import ReservationSummary from "../pages/reservation/ReservationSummary";
import ReservationDetails from "../pages/home/ReservationDetails";
import { useState } from "react";

const Routing = () => {
  const [state, setState] = useState({});
  return (
    <Router>
      <Routes>
        <Route path="/auth/login-admin" element={<LoginAdmin />} />
        <Route path="/reservation-details" element={<ReservationDetails state={state} />} />

        <Route path="/" element={<Private><Home /></Private>} />
        <Route path="/filmler" element={<Private><Filmler /></Private>} />
        <Route path="/filmsalon/:movie_id" element={<Private><FilmSalonlari /></Private>} />
        <Route path="/rezervasyon/:showtime_id" element={<Private><Rezervasyon setState={setState} /></Private>} />
        <Route path="dashboard/reservation/summary/:showtime_id" element={<Private><ReservationSummary /></Private>} />

        <Route path="dashboard" element={<Private><Dashboard /></Private>} />

        <Route path="dashboard/movies" element={<Private><MoviesPage /></Private>} />
        <Route path="dashboard/movies/add" element={<Private><AddMovie /></Private>} />
        <Route path="dashboard/movies/update/:id" element={<Private><UpdateMovie /></Private>} />

        <Route path="dashboard/showtimes" element={<Private><Showtimes /></Private>} />
        <Route path="dashboard/showtimes/hall" element={<Private><HallsList/></Private>} />
        <Route path="dashboard/showtimes/hall/:hall_id" element={<Private><ShowtimesByHall /></Private>} />
        <Route path="dashboard/showtimes/create" element={<Private><CreateShowTime /></Private>} />
        <Route path="dashboard/showtimes/update/:id" element={<Private><UpdateMovie /></Private>} />

        <Route path="dashboard/reservation" element={<Private><ReservationsPage /></Private>} />
        <Route path="dashboard/reservation/movies" element={<Private><MoviesWithShowtimes /></Private>} />
        <Route path="dashboard/reservation/reserve/:showtime_id" element={<Private><MakeReservation /></Private>} />
        <Route path="dashboard/reservation/seat/:hall_id/:showtime_id" element={<Private><SeatSelection /></Private>} />
        
      </Routes>
    </Router>
  );
};

export default Routing;
