# Node.js Backend Application

This Node.js API allows you to store users' emails and locations and automatically send hourly weather reports every 3 hours.

# Instructions

1. Set up a Node.js project and install the necessary dependencies such as Express and
   Mongoose.
2. Create a MongoDB database and define a schema for storing user details such as email,
   location, and weather data.
3. Use the OpenWeatherMap API to fetch weather data for the users’ locations.
4. Create routes for storing user details, updating users’ locations, and retrieving users’
   weather data for a given day.
5. Use (Nodemailer + Gmail ) or another email service to send hourly weather reports to
   the users’ emails every 3 hours.

## Prerequisites

- Node.js and npm installed on your system
- MongoDB installed and running

## Environment Variables

.env file was created with environmental variables for email, password and to store mongoDB URL.

## Bonus

Error handling and validation for the routes were added
