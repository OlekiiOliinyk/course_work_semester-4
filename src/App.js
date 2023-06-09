import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';


import './styles/App.css';
import NabBar from './NavBar';
import Events from './Events';
import QuizTopics from './QuizTopics';
import EventDetails from './EventDetails';



function App() {

  

  return (


    <Router>
      <div className="App">


        <NabBar />
        <div className="content">

          <Routes>



            <Route path='/' element={<Events />}> </Route>

            <Route path='/:id' element={<EventDetails />}> </Route>

            <Route path='/quizTopics' element={<QuizTopics />}> </Route>
            
            
          </Routes>

        </div>

      </div>
    </Router>
  );
}

export default App;
