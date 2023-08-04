const mongoose = require('mongoose');
const Reaction = require('./Reaction');
const Thought = require('./Thought');
const User = require('./User');


// Connect to MongoDB again
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/another_social_network_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = {
  Reaction,
  Thought,
  User,
};