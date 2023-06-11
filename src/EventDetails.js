import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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


    return (  
        <div className="event-details-preview">
            
            <h2>{event.title}</h2>

            <img src={event.photoURL} />

            <p>{event.description}</p>

        </div>
    );
}
 
export default EventDetails;