import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './styles/App.css';
import NabBar from './NavBar';
import Events from './Events';
import QuizTopics from './QuizTopics';
import EventDetails from './EventDetails';
import Quiz from './Quiz';
import Login from './login';
import SignUp from './signup';
import UserDetails from './userDetails';

function App() {

  const isLoggedIn = window.localStorage.getItem("loggedIn");

  return (


    <Router>
      <div className="App">


        <NabBar />


        <div className="content">

          <Routes>

            <Route exact path="/" element={isLoggedIn == "true" ? <UserDetails /> :  <Login />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/userDetails" element={isLoggedIn == "true" ? <UserDetails /> :  <Login />} />
            
            <Route path='/eventTopics' element={<Events />}> </Route>

            <Route path='/event/:id' element={<EventDetails />}> </Route>

            <Route path='/quizTopics' element={<QuizTopics />}> </Route>

            <Route path='/quiz/:id' element={<Quiz />}> </Route>
            
          </Routes>

        </div>

      </div>
    </Router>
  );
}

export default App;
