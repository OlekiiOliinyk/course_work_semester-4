const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');  

const app = express();

app.use(cors());  // use it as middleware

const mongoURL = 'mongodb://localhost:27017/TimeSaga';

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(error => {
  console.error('Error connecting to MongoDB', error);
});



const Event = require("./eventSchema");

app.get('/getEventDetails', async (req, res) => {
  try {
    const events = await Event.find({});
    res.json(events);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get('/getEventDetails/:id', async (req, res) => {
  const eventId = req.params.id;

  try {
    const event = await Event.findOne({ id: eventId });
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json(event);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


const Quiz = require('./quizSchema');


app.get('/getQuizDetails', async (req, res) => {
  try {
    const quizzes = await Quiz.find({});
    res.json(quizzes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/getQuizDetails/:id', async (req, res) => {
  const eventId = req.params.id;

  try {
    const event = await Quiz.findOne({ id: eventId });
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json(event);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



const port = 2000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});