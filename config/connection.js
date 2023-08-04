//connection to your MongoDB database using Mongoose.
// derived to similar from project 3
const mongoose = require('mongoose');
require('dotenv').config();
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/another_social_network_db')
  .then(() => {
    console.log('Connected to MongoDB database!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

module.exports = mongoose.connection;