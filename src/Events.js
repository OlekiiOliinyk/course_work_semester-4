import {useState, useEffect} from 'react';
import { base } from './ProtoDB';
import './styles/Events.css';
import { Link } from 'react-router-dom';

const Events = () => {

    const [events, setEvents] = useState(base);
    
    return (    

        <div className="events">


            {events.map((event) => (
      
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