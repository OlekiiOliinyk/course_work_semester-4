require('dotenv').config();

module.exports = {
  mongoURL: process.env.MONGODB_URL,
  port: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
};