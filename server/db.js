// db.js
const mongoose = require('mongoose');
const config = require('./config');
require('./schemas/UserSchema');
require('./schemas/eventReadSchema');
require('./schemas/quizScoreSchema');

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
};

module.exports = connectDB;