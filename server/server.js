const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  
const app = express();
require('dotenv').config();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(cors());

const mongoURL = process.env.MONGODB_URL;
const port = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;


mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(error => {
  console.error('Error connecting to MongoDB', error);
});


require("./UserSchema");

const User = mongoose.model("users");

app.post("/register", async(req, res) => {
  const {firstName, lastName, email, password} = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    const oldUser = await User.findOne({email});
    if (oldUser){
      return res.send({error:"User Exists"})
    }

    await User.create({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
    });
    res.send({status:"ok"})
  } catch (error) {
    res.send({status:"error"})
  }
});


app.post("/login-user", async(req, res) => { 
  const {email, password} = req.body;

  const user = await User.findOne({email});

  if (!user){
    return res.send({error:"User not found"})
  }
  if (await bcrypt.compare(password, user.password)){
    const token = jwt.sign({email:user.email}, JWT_SECRET);
    if (res.status(201)){
      return res.json({status:"ok", data:token});
    }else{
      return res.json({error: "error"})
    }
  }
  res.json({status:"error", error:"Incorrect Password"})
});

app.post("/userData", async(req,res) => {
  const{token} = req.body;

  try {

    const user = jwt.verify(token, JWT_SECRET);

    const useremail = user.email;
    
    User.findOne({email:useremail }).then((data)=>{
      res.send({status: "ok", data: data})
    }).catch((error) => {
      res.send({status: "error", data: data})
    });
    
  } catch (error) {
    
  }
})


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



require("./eventRead");

const EventRead = mongoose.model("readEvents");

app.post("/getAllReadEvents", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const user = jwt.verify(token, JWT_SECRET);
    const userEmail = user.email;

    const readEvents = await EventRead.find({ emailId: userEmail }).select(
      "eventId"
    );

    res.json({ events: readEvents });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post("/updateEventRead", async (req, res) => {
  const { token, id } = req.body;

  try {
    const user = jwt.verify(token, JWT_SECRET);
    const useremail = user.email;

    const isRead = await EventRead.findOne({ emailId: useremail, eventId: id });

    if (isRead) {
      return res.send({ status: "Already Read" });
    }

    await EventRead.create({
      emailId: useremail,
      eventId: id,
    });

    res.send({ status: "IsUpdated" });
  } catch (error) {
    console.log(error);
    res.send({ status: "Error" });
  }
});










require("./quizScoreSchema");

const QuizScore = mongoose.model("quizzesScores");

app.post("/getAllQuizzesScores", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const user = jwt.verify(token, JWT_SECRET);
    const userEmail = user.email;

    const quizzesScores = await QuizScore.find({ emailId: userEmail }).select(
      "quizId lastScore"
    );

    res.json({ scores: quizzesScores });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/updateQuizScore", async (req, res) => {
  const { token, id, lastScore } = req.body;

  try {
    const user = jwt.verify(token, JWT_SECRET);
    const useremail = user.email;

    const userScore = await QuizScore.findOne({ emailId: useremail, quizId: id });

    if (userScore) {
      userScore.lastScore = lastScore;
      await userScore.save();
      return res.send({ status: "User Score updated" });
    }
    await QuizScore.create({
      emailId: useremail,
      quizId: id,
      lastScore: lastScore,
    });
    

    res.send({ status: "User Score Created" });
  } catch (error) {
    console.log(error);
    res.send({ status: "Error" });
  }
});



app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});