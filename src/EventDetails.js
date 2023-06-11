import { base } from './ProtoDB';
import { useParams } from 'react-router-dom';

const EventDetails = () => {   

    const {id} = useParams();


    const index = parseInt(id, 10) - 1;



    return (  
        <div className="event-details-preview">
            
            <h2>{base[index].title}</h2>

            <img src={base[index].photo} />

            <p>{base[index].description}</p>

        </div>
    );
}
 
export default EventDetails;