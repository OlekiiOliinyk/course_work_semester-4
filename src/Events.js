import {useState, useEffect} from 'react';
import Filter from './Filter';
import './styles/Events.css';
import { Link } from 'react-router-dom';
import { getFilteredItems} from './Filter';

const Events = () => {


  const [events, setEvents] = useState([]);

  const [query, setQuery] = useState("");
  const [readEvents, setReadEvents] = useState([]);
  const filteredItems = getFilteredItems(query, events);
  
  useEffect(() => {
    fetchEvents();
    fetchAllReadEvents();
   
  }, []);

  const fetchAllReadEvents = async () => {
    try {
      const token = window.localStorage.getItem("token");
  
      const response = await fetch("http://localhost:2000/event/getAllReadEvents", {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        const readEvents = data.events.map((event) => event.eventId);
        setReadEvents(readEvents);
        console.log(readEvents);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:2000/event/getEventDetails');
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
            {readEvents.includes(event.id) && <h2 className="read-status">Прочитано</h2>}

            
          </div>
        </Link>
      ))}
    </div>
  );
}
  
export default Events;