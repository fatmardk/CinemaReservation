import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Wrapper from "../dashboard/Wrapper";

const MakeReservation = () => {
  const { showtime_id } = useParams();
  const navigate = useNavigate();
  const [showtimeDetails, setShowtimeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Ogrenci");

  useEffect(() => {
    const fetchShowtimeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/showtimes/${showtime_id}`);
        const details = response.data;
        setShowtimeDetails(details);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching showtime details:", error.message);
        setLoading(false);
        setError("Showtime details not found."); // Set error message
      }
    };

    fetchShowtimeDetails();
  }, [showtime_id]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleReservation = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/reservations/make", {
        user_id: 1,
        showtime_id: showtime_id,
        category: selectedCategory,
        price: 0,
      });
      alert("Reservation made successfully!");
      navigate(`/dashboard/reservation/seat/${showtimeDetails.hall_id}/${showtime_id}`);
    } catch (error) {
      console.error("Error making reservation:", error);
      alert("Failed to make reservation.");
    }
  };

  return (
    <Wrapper>
      <div>
        <h2>Make Reservation</h2>
        {loading ? (
          <p>Loading showtime details...</p>
        ) : error ? (
          <p>{error}</p> // Display error message
        ) : showtimeDetails && (
          <div>
            <h3>Selected Movie: {showtimeDetails.movie_title}</h3>
            <h4>Hall: {showtimeDetails.hall_name}</h4>
            <p>
              Showtime: {new Date(showtimeDetails.start_time).toLocaleString()} - {new Date(showtimeDetails.end_time).toLocaleString()}
            </p>
          </div>
        )}
        <div>
          <label>Select Category:</label>
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="Ogrenci">Student</option>
            <option value="Sivil">Civilian</option>
          </select>
        </div>
        <button onClick={handleReservation} disabled={!showtimeDetails}>
          Complete Reservation
        </button>
      </div>
    </Wrapper>
  );
};

export default MakeReservation;