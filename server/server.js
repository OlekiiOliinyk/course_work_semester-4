const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();

const { port } = require('./config');
const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');
const eventRoutes = require('./routes/eventRoutes');

app.use(express.json());
app.use(cors());

connectDB();

app.use('/auth', authRoutes);
app.use('/quiz', quizRoutes);
app.use('/event', eventRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
