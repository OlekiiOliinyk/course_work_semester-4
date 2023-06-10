import './styles/Quiz.css'
import React, {useState} from 'react';
import { questionTopics } from './ProtoDB';
import { useParams } from 'react-router-dom';

const Quiz = () => {

    const {id} = useParams();


    const index = parseInt(id, 10) - 1;

    const questions = questionTopics[index].questions;

    const [showFinalResults, setFinalResults] = useState(false);

    const [score, setScore] = useState(0);

    const [currentQuestion, setCurrentQuestion] = useState(0);


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

    const restartGame = () => {
        setScore(0);
        setCurrentQuestion(0);
        setFinalResults(false);
    }

    return ( 

        <div className="quiz">


            <h2>Current Score: {score}</h2>
            

            {showFinalResults ?
            
                <div className="final-results">
                    <h1>Final results</h1>

                    <h2>{score} out of {questions.length} correct - ({(score/questions.length )* 100} %)</h2>

                    <button onClick={()=> restartGame()}>Restart game</button>
            
                </div>

            :
            
                <div className="question-card">
                    <h2>Question {currentQuestion + 1} out of {questions.length}</h2>

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