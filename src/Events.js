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
      const sortedData = data.sort((a, b) => {
        const startYearA = parseInt(a.year.split('-')[0]);
        const startYearB = parseInt(b.year.split('-')[0]);
        return startYearA - startYearB;
      });
      setEvents(sortedData);
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
            
            <h4>Період: {event.year} роки</h4>
          </div>
        </Link>
      ))}
    </div>
  );
}
  
export default Events;