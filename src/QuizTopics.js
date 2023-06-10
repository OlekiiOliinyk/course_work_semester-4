import { Link } from 'react-router-dom';
import { questionTopics } from './ProtoDB';
import {useState, useEffect} from 'react';
import "./styles/QuizTopics.css"
import Filter from './Filter';
import { getFilteredItems } from './Filter';



const QuizTopics = () => {

    const [quizzesTopics, setQuizzesTopics] = useState(questionTopics);
    const [query, setQuery] = useState("");
    const filteredItems = getFilteredItems(query, quizzesTopics);

    const handleFilterChange = (e) => {
        setQuery(e.target.value);
    }


    return ( 
        
        <div className="quiz">

            <Filter value={query} onChange={handleFilterChange} />  

            {filteredItems.map((quiz) => (
                
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