import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SeatSelection = () => {
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const { hall_id, showtime_id } = useParams();
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/reservations/seats/${hall_id}/${showtime_id}`
        );
        setSeats(response.data);
        console.log(seats);
        console.log(response);
      } catch (error) {
        console.error("Error fetching seats:", error);
      }
    };

    fetchSeats();
  }, [hall_id, showtime_id]);

  const handleSeatClick = (seatNumber) => {
    setSelectedSeat(seatNumber);
  };

  const handleReservation = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/reservations/make",
        {
          user_id: 1, // örnek kullanıcı ID
          showtime_id,
          seat_number: selectedSeat,
          category: "Ogrenci", // örnek kategori
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error making reservation:", error);
    }
  };

  return (
    <div>
      <h3>Select a Seat</h3>
      <div className="seats">
        {seats.map((seat, index) => (
          <button
            key={index}
            onClick={() => handleSeatClick(seat.seat_number)}
            disabled={selectedSeat === seat.seat_number}
          >
            {seat.seat_number}
          </button>
        ))}
      </div>
      {selectedSeat && (
        <div>
          <p>Selected Seat: {selectedSeat}</p>
          <button onClick={handleReservation}>Reserve</button>
        </div>
      )}
    </div>
  );
};

export default SeatSelection;
