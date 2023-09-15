// controllers/user.js
const User = require('../models/User');

// Create a new user
async function createUser(req, res) {
  try {
    const { email, location, date, time } = req.body;

    // Check if the user with the same email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'User with this email already exists' });
    }

    // Create a new user
    const newUser = new User({ email, location });

    // Add initial weather data
    newUser.weatherData.push({ date, time });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Update user location
async function updateLocation(req, res) {
  try {
    const { id } = req.params;
    const { location } = req.body;

    const user = await User.findByIdAndUpdate(id, { location }, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error updating location:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Get user weather data for a given day
async function getUserWeatherData(req, res) {
  try {
    const { id, date } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find weather data for the given date
    const weatherData = user.weatherData.find(
      (data) => data.date.toISOString().split('T')[0] === date
    );

    if (!weatherData) {
      return res
        .status(404)
        .json({ message: 'Weather data not found for the specified date' });
    }

    res.json(weatherData);
  } catch (error) {
    console.error('Error getting user weather data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  createUser,
  updateLocation,
  getUserWeatherData,
};
