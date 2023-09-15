const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Error handling middleware
function handleErrors(fn) {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}

// Validation middleware for user creation
function validateUser(req, res, next) {
  const { email, location } = req.body;

  if (!email || !location) {
    return res.status(400).json({ message: 'Email and location are required' });
  }

  next();
}

// Create a new user
router.post('/users', validateUser, handleErrors, UserController.createUser);

// Update user location
router.put(
  '/users/:id/location',
  validateUser,
  handleErrors,
  UserController.updateLocation
);

// Get user weather data for a given day
router.get(
  '/users/:id/weather/:date',
  validateUser,
  handleErrors,
  UserController.getUserWeatherData
);

module.exports = router;
