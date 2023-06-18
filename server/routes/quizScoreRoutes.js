const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const QuizScore = require('../schemas/quizScoreSchema');
const {JWT_SECRET}= require('../config');


// Get all quiz scores for a user
router.post('/getAllQuizzesScores', async (req, res) => {
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

// Update quiz score for a user
router.post('/updateQuizScore', async (req, res) => {
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