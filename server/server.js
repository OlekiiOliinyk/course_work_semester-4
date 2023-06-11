const express = require('express');
const mongoose = require('mongoose');

const app = express();

// MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/TimeSaga'; 

// Establish the MongoDB connection
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(error => {
  console.error('Error connecting to MongoDB', error);
});

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date
});

const Event = mongoose.model('Event', eventSchema);

app.get('/getEventDetails', async (req, res) => {
    try {
      const events = await Event.find({});
      res.send({
        status: 'ok',
        data: events
      });
    } catch (error) {
      console.log(error);
    }
  });

const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
