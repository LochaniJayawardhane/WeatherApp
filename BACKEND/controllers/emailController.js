// controllers/emailController.js
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const User = require('../models/User');
const { fetchWeatherDataForLocation } = require('../services/weatherService');

// Function to send hourly weather reports
async function sendHourlyWeatherReports() {
  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_ADDRESS, // Use the environment variable
        pass: process.env.EMAIL_PASSWORD, // Use the environment variable
      },
    });

    // Query the database to get users' email addresses and locations
    const users = await User.find({}, 'email location');

    // Schedule sending hourly weather reports every 3 hours
    cron.schedule('0 */3 * * *', async () => {
      for (const user of users) {
        // Fetch weather data for the user's location using the imported function
        const weatherData = await fetchWeatherDataForLocation(user.location);

        // Compose the email content
        const mailOptions = {
          from: process.env.EMAIL_ADDRESS,
          to: user.email,
          subject: 'Hourly Weather Report',
          text: `Here is the hourly weather report for ${
            user.location
          }:\n${JSON.stringify(weatherData, null, 2)}`,
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);

        console.log(`Email sent to ${user.email} successfully:`, info.response);
      }
    });

    console.log('Hourly weather report scheduler started.');
  } catch (error) {
    console.error(
      'Error scheduling and sending hourly weather reports:',
      error
    );
  }
}

module.exports = {
  sendHourlyWeatherReports,
};
