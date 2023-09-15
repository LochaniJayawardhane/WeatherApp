// services/weatherService.js
const axios = require('axios');
const UserController = require('../controllers/userController');
const User = require('../models/User');
const config = require('../config/config');

// OpenWeatherMap API Key
const apiKey = config.openWeatherMapApiKey;

// Function to fetch weather data for a location
async function fetchWeatherDataForLocation(location) {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error(`Error fetching weather data for ${location}:`, error);
    throw error;
  }
}

// Function to update user location and fetch weather data
async function updateUserLocationAndFetchWeather(userId, newLocation) {
  try {
    const updatedUser = await UserController.updateLocation({
      params: { id: userId },
      body: { location: newLocation },
    });

    // Check if the location was successfully updated
    if (!updatedUser) {
      throw new Error('User not found');
    }

    // Fetch weather data for the updated location
    const weatherData = await fetchWeatherDataForLocation(newLocation);

    return { user: updatedUser, weatherData };
  } catch (error) {
    console.error('Error updating location and fetching weather data:', error);
    throw error;
  }
}

module.exports = {
  fetchWeatherDataForLocation,
  updateUserLocationAndFetchWeather,
};
