import './styles/Quiz.css'

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Quiz = () => {

    const {id} = useParams();

    const index = parseInt(id, 10) - 1;


    const [showFinalResults, setFinalResults] = useState(false);

    const [score, setScore] = useState(0);

    const [currentQuestion, setCurrentQuestion] = useState(0);


    const [questions, setQuestions] = useState([]);
  
    useEffect(() => {
      fetchQuestions();
    }, [id]);
  
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`http://localhost:2000/getQuizDetails/${id}`);
        const data = await response.json();
        setQuestions(data.questions);
      } catch (error) {
        console.log(error);
      }
    };
  
    if (questions.length === 0) {
      return <div>Loading...</div>;
    }


    const optionClicked = (isCorrect) => {
        if (isCorrect){
            setScore(score + 1);
        }

        if (currentQuestion + 1 < questions.length){
            setCurrentQuestion(currentQuestion + 1);
        }
        else{
            setFinalResults(true);
        }
    }

    const quizScoreUpdate = () => {
        const token = window.localStorage.getItem("token");
    
        fetch("http://localhost:2000/updateQuizScore", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            token: token,
            id: id,
            lastScore: (score/questions.length )* 100,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
      };

    return ( 

        <div className="quiz">


            
            {!showFinalResults && <h2>Поточний бал: {score}</h2>}
            

            {showFinalResults ?
            
                <div className="final-results">
                    <h1>Результат</h1>

                    <h2>{score} {score < 5 ? "відповіді" : "відповідей"} з {questions.length} правильні </h2>

                    <h2>{(score/questions.length )* 100} %</h2>

                    <Link to='/quizTopics'><button onClick={() => quizScoreUpdate()}>Повернутися до тестів</button></Link>
                    
            
                </div>

            :
            
                <div className="question-card">
                    <h2>Питання №{currentQuestion + 1} з {questions.length}</h2>

                    <h3>{questions[currentQuestion].text}</h3>

                    <ul>
                        {questions[currentQuestion].options.map((option) => {
                            return (
                                <li onClick={
                                    () => optionClicked(option.isCorrect)
                                } key={option.id}>{option.text}</li>
                            );
                        })}

                    </ul>

                </div>
            }

        </div>


    );
}

export default Quiz;