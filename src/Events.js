import {useState, useEffect} from 'react';
import { base } from './ProtoDB';
import './styles/Events.css';
import { Link } from 'react-router-dom';
import Filter from './Filter'; 
import { getFilteredItems } from './Filter';

const Events = () => {


    const [events, setEvents] = useState(base);
    const [query, setQuery] = useState("");
    const filteredItems = getFilteredItems(query, events);

    const handleFilterChange = (e) => {
        setQuery(e.target.value);
    }


    return (    

        <div className="events">

            
            <Filter value={query} onChange={handleFilterChange} />

            {filteredItems.map((event) => (

                
      
                <Link to={`/event/${event.id}`}>
                
                <div className="event-preview" key={event.id}>

                    <h2>{event.title}</h2>
                    <h4>{event.year}</h4>

                </div>

               
                </Link>

            ))}

        </div>

    );
}
 
export default Events;