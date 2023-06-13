import { Link } from "react-router-dom";


const NabBar = () => {
    return ( 

        <nav className="navbar">
        <h1>TimeSaga</h1>

        <div className="links">

            <Link to="/eventTopics">Learn</Link>
            <Link to="/quizTopics">Tests</Link> 
 
        </div>

    </nav>

    );
}
 
export default NabBar;