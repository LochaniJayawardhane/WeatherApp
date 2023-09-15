// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
  },
  location: {
    type: String,
    required: true,
  },
  weatherData: [
    {
      date: {
        type: Date,
        required: true,
      },
      temperature: {
        type: Number,
        required: true,
      },
    },
  ],
});

// Create a User model using the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
