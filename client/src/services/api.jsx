import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

export const fetchMovies = () => api.get('/movies/list');
export const registerUser = (userData) => api.post('/users/register', userData);
export const makeReservation = (reservationData) => api.post('/reservations/make', reservationData);

