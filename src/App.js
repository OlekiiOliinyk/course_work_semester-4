import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './styles/App.css';
import NavBar from './NavBar';
import Events from './Events';
import QuizTopics from './QuizTopics';
import EventDetails from './EventDetails';
import Quiz from './Quiz';
import Login from './Login';
import SignUp from './Signup';
import Footer from './Footer';


function App() {

  const isLoggedIn = window.localStorage.getItem("loggedIn");


  return (

    <Router>
      <div className="App">


        <NavBar />


        <div className="content">

          <Routes>

            {!isLoggedIn && (
              <>
                <Route exact path="/" element={isLoggedIn == "true" ? <Events /> :  <Login />} />
                <Route path="/sign-in" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
                
              </>
            )}
            {isLoggedIn && (
              <>
                <Route path='/eventTopics' element={<Events />}> </Route>

                <Route path='/event/:id' element={<EventDetails />}> </Route>

                <Route path='/quizTopics' element={<QuizTopics />}> </Route>

                <Route path='/quiz/:id' element={<Quiz />}> </Route>
                
              </>
            )}
                
          </Routes>
              

          {isLoggedIn && (
              <><Footer /></>
          )}
                  
        </div>
        
        


      </div>
    </Router>
  );
}

export default App;
