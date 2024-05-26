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

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filmler" element={<Filmler />} />
        <Route path="/filmsalon/:movie_id" element={<FilmSalonlari />} />
        <Route path="/rezervasyon/:showtime_id" element={<Rezervasyon />} />
        <Route path="auth">
          <Route path="login-admin" element={<LoginAdmin />} />
        </Route>
        <Route
          path="dashboard"
          element={
            <Private>
              <Dashboard />
            </Private>
          }
        />
        <Route path="dashboard">
          <Route
            path="movies"
            element={
              <Private>
                <MoviesPage />
              </Private>
            }
          />
          <Route path="movies">
            <Route
              path="add"
              element={
                <Private>
                  <AddMovie />
                </Private>
              }
            />
            <Route
              path="update/:id"
              element={
                <Private>
                  <UpdateMovie />
                </Private>
              }
            />
          </Route>
          <Route
            path="showtimes"
            element={
              <Private>
                <Showtimes />
              </Private>
            }
          />
          <Route path="showtimes">
            <Route
              path="hall/:hall_id"
              element={
                <Private>
                  <ShowtimesByHall />
                </Private>
              }
            />
            <Route
              path="create"
              element={
                <Private>
                  <CreateShowTime />
                </Private>
              }
            />
            <Route
              path="update/:id"
              element={
                <Private>
                  <UpdateMovie />
                </Private>
              }
            />
          </Route>
          <Route
            path="reservation"
            element={
              <Private>
                <ReservationsPage />
              </Private>
            }
          />
          <Route path="reservation">
            <Route path="movies" element={<MoviesWithShowtimes />} />
            <Route path="reserve/:showtime_id" element={<MakeReservation />} />
            <Route path="seat/:hall_id/:showtime_id" element={<SeatSelection />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default Routing;
