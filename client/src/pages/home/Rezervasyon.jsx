import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Rezervasyon = () => {
  const { showtime_id } = useParams();
  const [reservedSeats, setReservedSeats] = useState([]);
  const [capacity, setCapacity] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservedSeats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/reservations/seats/${showtime_id}`
        );
        setReservedSeats(response.data.reservedSeats);
        setCapacity(response.data.hallCapacity);
      } catch (error) {
        console.error("Error fetching reserved seats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservedSeats();
  }, [showtime_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-center">
      <h3>Dolu Koltuk Numaraları:</h3>
      {reservedSeats.length > 0 ? (
        <ul>
          {reservedSeats.map((seat, index) => (
            <li className="inline-block" key={index}>|  {seat}  |</li>
          ))}
        </ul>
      ) : (
        <p>No reserved seats.</p>
      )}

      <h1 className="text-xl">Salon kapasitesi : {capacity}</h1>
    </div>
  );
};

export default Rezervasyon;
