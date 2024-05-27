import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const SeatSelection = () => {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { hall_id, showtime_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/reservations/seats/${hall_id}/${showtime_id}`);
        setSeats(response.data);
      } catch (error) {
        console.error("Error fetching seats:", error);
      }
    };

    fetchSeats();
  }, [hall_id, showtime_id]);

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleReservation = async () => {
    try {
      await Promise.all(
        selectedSeats.map((seat) =>
          axios.post("http://localhost:8080/api/reservations/make", {
            user_id: 1, // örnek kullanıcı ID
            showtime_id,
            seat_number: seat,
            category: "Ogrenci", // örnek kategori
          })
        )
      );
      alert("Reservation made successfully!");
      navigate(`/dashboard/reservation/summary/${showtime_id}`);
    } catch (error) {
      console.error("Error making reservation:", error);
    }
  };

  return (
    <div>
      <h3>Select Seats</h3>
      <div className="seats">
        {seats.map((seat, index) => (
          <button
            key={index}
            onClick={() => handleSeatClick(seat.seat_number)}
            disabled={selectedSeats.includes(seat.seat_number)}
          >
            {seat.seat_number}
          </button>
        ))}
      </div>
      {selectedSeats.length > 0 && (
        <div>
          <p>Selected Seats: {selectedSeats.join(", ")}</p>
          <button onClick={handleReservation}>Reserve</button>
        </div>
      )}
    </div>
  );
};

export default SeatSelection;
