const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const urlRoutes = require('./routes/urlRoutes');
const urlController = require('./controllers/urlController');

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.static('public')); // Serve frontend

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/url', urlRoutes);
app.get('/:shortUrl', urlController.redirectToLongUrl);

// Run server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});