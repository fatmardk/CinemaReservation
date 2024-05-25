const express = require('express');
require('dotenv').config();
require('colors');
const cors = require('cors');
const connect = require('./config/db');
const userRoute = require('./routes/userRoute');
const movieRoute = require('./routes/movieRoute');
const ratingRoute = require('./routes/ratingRoute');
const commentRoute = require('./routes/commentRoute');
const authRoute = require('./routes/authRoute');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(`Server is running at ${PORT} port!`.magenta.italic));

app.use('/api', userRoute);
app.use('/api', movieRoute);
app.use('/api', ratingRoute);
app.use('/api', commentRoute);
app.use('/api', authRoute);

const startServer = async () => {
    // try {
    //     const response = await connect(qStr);
    //     console.log('Query result:', response);
    // } catch (err) {
    //     console.error('Error executing query', err);
    // }
};

startServer();
