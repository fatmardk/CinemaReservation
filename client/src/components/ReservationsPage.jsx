import React, { useState } from 'react';
import { makeReservation } from '../services/api';

const ReservationsPage = () => {
    const [showtime_id, setShowtimeId] = useState('');
    const [user_id, setUserId] = useState('');
    const [seat_number, setSeatNumber] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');

    const handleReservation = async () => {
        try {
            const response = await makeReservation({ showtime_id, user_id, seat_number, category, price });
            console.log('Reservation successful:', response.data);
        } catch (error) {
            console.error('Error making reservation:', error);
        }
    };

    return (
        <div>
            <h1>Make a Reservation</h1>
            <input
                type="text"
                value={showtime_id}
                onChange={(e) => setShowtimeId(e.target.value)}
                placeholder="Showtime ID"
            />
            <input
                type="text"
                value={user_id}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="User ID"
            />
            <input
                type="text"
                value={seat_number}
                onChange={(e) => setSeatNumber(e.target.value)}
                placeholder="Seat Number"
            />
            <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
            />
            <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
            />
            <button onClick={handleReservation}>Make Reservation</button>
        </div>
    );
};

export default ReservationsPage;
