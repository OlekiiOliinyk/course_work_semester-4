const mongoose = require("mongoose");

const QuizScoreSchema = new mongoose.Schema(
    {
        emailId: String,
        quizId: Number,
        lastScore: Number,

    },
    {
        collection: "quizzesScores",
    }
);

mongoose.model("quizzesScores", QuizScoreSchema);