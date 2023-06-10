import { Link } from 'react-router-dom';
import { questionTopics } from './ProtoDB';
import {useState, useEffect} from 'react';
import "./styles/QuizTopics.css"

const QuizTopics = () => {

    const [quizzesTopics, setQuizzesTopics] = useState(questionTopics);


    return ( 
        
        <div className="quiz">


            {quizzesTopics.map((quiz) => (
                
                <Link to={`/quiz/${quiz.id}`}>
                
                <div className="quizzes-preview" key={quiz.id}>

                    <h2>{quiz.title}</h2>
                    
                </div>

                
                </Link>

            ))}

        </div>



    );
}
 
export default QuizTopics;