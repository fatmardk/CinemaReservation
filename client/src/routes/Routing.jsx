import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Public from "./Public";
import Private from "./Private";
import LoginAdmin from "../pages/auth/LoginAdmin";
import Dashboard from "../pages/auth/Dashboard";
import Home from "../pages/Home";
import Movies from "../pages/movies/Movies";
import AddMovie from "../pages/movies/AddMovie";
import UpdateMovie from "../pages/movies/UpdateMovie";
import MoviesPage from "../pages/movies/MoviesPage";
import ReservationsPage from "../pages/reservation/ReservationsPage";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
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
          <Route path="movies" element={<Movies />} />
          <Route path="movies">
            <Route path="add" element={<AddMovie />} />
            <Route path="edit/:id" element={<UpdateMovie />} />
          </Route>
          <Route path="reservation" element={<ReservationsPage />} />
          

        </Route>
      </Routes>
    </Router>
  );
};

export default Routing;
