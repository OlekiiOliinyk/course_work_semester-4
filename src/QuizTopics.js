import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "./styles/QuizTopics.css"
import Filter from './Filter';
import { getFilteredItems } from './Filter';

const QuizTopics = () => {
  const [quizzesTopics, setQuizzesTopics] = useState([]);
  const [query, setQuery] = useState("");
  const filteredItems = getFilteredItems(query, quizzesTopics);
  const [quizzesScores, setQuizzesScores] = useState([]);

  const fetchQuizzes = async () => {
    try {
      const response = await fetch('http://localhost:2000/getQuizDetails');
      const data = await response.json();
      const sortedData = data.sort((a, b) => {
        const startYearA = parseInt(a.period.split('-')[0]);
        const startYearB = parseInt(b.period.split('-')[0]);
        return startYearA - startYearB;
      });
      setQuizzesTopics(sortedData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllQuizzesScores = async () => {
    try {
      const token = window.localStorage.getItem("token");

      const response = await fetch("http://localhost:2000/getAllQuizzesScores", {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        const quizzesScores = data.scores.map((score) => ({
          id: score.quizId,
          score: score.lastScore,
        }));
        setQuizzesScores(quizzesScores);
        console.log(quizzesScores);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
    fetchAllQuizzesScores();
  }, []);

  const handleFilterChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="quiz">
      <Filter value={query} onChange={handleFilterChange} />

      {filteredItems.map((quiz) => (
        <Link to={`/quiz/${quiz.id}`} key={quiz.id}>
          <div className="quizzes-preview">
            <h2>{quiz.title}</h2>
            <p>Період: {quiz.period} роки</p>
            {quizzesScores.find((score) => score.id === quiz.id) && (
              <h2>Крайня спроба: {quizzesScores.find((score) => score.id === quiz.id).score}%</h2>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default QuizTopics;
