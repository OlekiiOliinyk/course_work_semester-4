import { Link } from 'react-router-dom';
import { questionTopics } from './ProtoDB';
import {useState, useEffect} from 'react';
import "./styles/QuizTopics.css"
import Filter from './Filter';
import {getFilteredItems} from './Filter';

const QuizTopics = () => {

    const [quizzesTopics, setEvents] = useState([]);

    const [query, setQuery] = useState("");

    const filteredItems = getFilteredItems(query, quizzesTopics);


    const fetchEvents = async () => {
        try {
          const response = await fetch('http://localhost:2000/getQuizDetails');
          const data = await response.json();
          setEvents(data);
        } catch (error) {
          console.log(error);
        }

    };
      
    useEffect(() => {
        fetchEvents();
    }, []);
    
  
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