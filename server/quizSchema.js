const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: String,
  options: [
    {
      id: Number,
      text: String,
      isCorrect: Boolean
    }
  ]
});

const quizSchema = new mongoose.Schema({
  id: Number,
  title: String,
  questions: [questionSchema]
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;