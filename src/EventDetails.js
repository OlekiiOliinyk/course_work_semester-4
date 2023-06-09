import { base } from './ProtoDB';
import { useParams } from 'react-router-dom';

const EventDetails = () => {   

    const {id} = useParams();


    const index = parseInt(id, 10) - 1;



    return (  


        


        <div className="event-details-preview">


            
            <h2>FUck ofrf</h2>
            
            <h2>{base[index].year}</h2>
        </div>
    );
}
 
export default EventDetails;