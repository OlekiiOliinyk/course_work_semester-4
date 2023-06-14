import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./styles/EventDetails.css"

const EventDetails = () => {   

    const { id } = useParams();
    const [event, setEvent] = useState(null);
  
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:2000/getEventDetails/${id}`);
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      fetchEvent();
    }, [id]);
  
    if (!event) {
      return <div>Loading...</div>;
    }

    function TextComponent(text) {
      
      const lines = text.split('\n').map((line, index) => (
        <span key={index}>
          {line}
          <br />
        </span>
      ));
    
      return <div>{lines}</div>;
    }
    

    return (  
        <div className="event-details-preview">
            
            <h2>{event.title}</h2>

            <img src={event.photoURL} />
            <p className='photo_desc'>{event.photo_description}</p>

            <p className='event_info'>{TextComponent(event.description)}</p>

        </div>
    );
}
 
export default EventDetails;