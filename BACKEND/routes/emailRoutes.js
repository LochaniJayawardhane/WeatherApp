// emailRoutes.js
const express = require('express');
const router = express.Router();
const { sendHourlyWeatherReports } = require('./controllers/emailController');

// Create a route to trigger the sending of hourly weather reports
router.get('/send-hourly-reports', (req, res) => {
  // Call the function to send hourly weather reports via email
  sendHourlyWeatherReports();
  res.status(200).json({ message: 'Hourly weather reports scheduled.' });
});

module.exports = router;
