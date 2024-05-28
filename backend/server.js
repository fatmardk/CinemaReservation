const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import routes
const authRoute = require('./routes/userRoute');
const movieRoutes = require('./routes/movieRoute');
const showtimeRoutes = require('./routes/showtimeRoute');
const reservationRoutes = require('./routes/reservationRoute');
const discountDaysRouter = require('./routes/discountDaysRouter'); // Düzgün içe aktarma

// Create Express app
const app = express();
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use routes
app.use('/api/users', authRoute);
app.use('/api/movies', movieRoutes);
app.use('/api/showtimes', showtimeRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/discount-days', discountDaysRouter); // Doğru rotayı kullanın

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
