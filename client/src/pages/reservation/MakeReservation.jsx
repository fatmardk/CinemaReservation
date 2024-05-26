import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const MakeReservation = () => {
    const { showtime_id } = useParams();
    const navigate = useNavigate();
    const [state, setState] = useState({
        user_id: 1, // Örnek olarak 1, giriş yapan kullanıcının id'si olmalı
        showtime_id,
        seat_number: "",
        category: "Ogrenci",
        price: 0
    });
    const [availableSeats, setAvailableSeats] = useState([]);

    useEffect(() => {
        const fetchAvailableSeats = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/showtimes/${showtime_id}/seats`);
                setAvailableSeats(response.data);
            } catch (error) {
                console.error("Error fetching available seats:", error);
            }
        };

        fetchAvailableSeats();
    }, [showtime_id]);

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/api/reservations", state);
            alert("Reservation made successfully!");
            navigate("/movies");
        } catch (error) {
            console.error("Error making reservation:", error);
            alert("Failed to make reservation.");
        }
    };

    return (
        <div>
            <h2>Make Reservation</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Seat Number:</label>
                    <select name="seat_number" value={state.seat_number} onChange={handleChange}>
                        <option value="">Select a seat</option>
                        {availableSeats.map((seat) => (
                            <option key={seat} value={seat}>{seat}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Category:</label>
                    <select name="category" value={state.category} onChange={handleChange}>
                        <option value="Ogrenci">Ogrenci</option>
                        <option value="Sivil">Sivil</option>
                    </select>
                </div>
                <button type="submit">Reserve</button>
            </form>
        </div>
    );
};

export default MakeReservation;
