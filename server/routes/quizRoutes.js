// quizRoutes.js
const mongoose = require('mongoose');
const express = require('express');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../config');
const QuizScore = mongoose.model("quizzesScores");

const Quiz = require('../schemas/quizSchema');

const router = express.Router();



router.get('/getQuizDetails', async (req, res) => {
    try {
      const quizzes = await Quiz.find({});
      res.json(quizzes);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.get('/getQuizDetails/:id', async (req, res) => {
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

router.get('/getQuizDetails', async (req, res) => {
  try {
    const quizzes = await Quiz.find({});
    res.json(quizzes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/getQuizDetails/:id', async (req, res) => {
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


router.post("/getAllQuizzesScores", async (req, res) => {
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

router.post("/updateQuizScore", async (req, res) => {
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

module.exports = router;
