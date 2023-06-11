import {useState, useEffect} from 'react';
import Filter from './Filter';
import './styles/Events.css';
import { Link } from 'react-router-dom';
import { getFilteredItems} from './Filter';

const Events = () => {


  const [events, setEvents] = useState([]);

  const [query, setQuery] = useState("");
  const filteredItems = getFilteredItems(query, events);
  
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:2000/getEventDetails');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.log(error);
    }
  };



  const handleFilterChange = (e) => {
    setQuery(e.target.value);
  }

  return (


    <div className="events">

      <Filter value={query} onChange={handleFilterChange} />  
  
      {filteredItems.map((event) => (
        <Link to={`/event/${event.id}`} key={event.id}>
          <div className="event-preview">
            <h2>{event.title}</h2>
            <h4>{event.year}</h4>
          </div>
        </Link>
      ))}
    </div>
  );
}
  
export default Events;