//connection to your MongoDB database using Mongoose.

const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/another_social_network_db';

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

module.exports = mongoose.connection;