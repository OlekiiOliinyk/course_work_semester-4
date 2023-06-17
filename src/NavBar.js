import { Link } from "react-router-dom";
import React, { Component } from 'react'
import "./styles/navbar.css"

export default class NavBar extends Component {

    constructor (props){
        super(props)

        this.state = {
            userData:"",

        }
    }


    logOut= () => {
        window.localStorage.clear();
        window.location.href = "./sign-in";
    }

    componentDidMount(){

      fetch("http://localhost:2000/userData", {
      method: "POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
        token:  window.localStorage.getItem("token"),
      })

    }).then((res) => res.json())
    .then((data) => {
      console.log(data, "userData");
      this.setState({userData: data.data});
    });
    
    }


    
    render(){

        const isLoggedIn = window.localStorage.getItem("loggedIn");

        return ( 
            <div>
                {isLoggedIn == "true" ?
                    <nav className="navbar">
                        
                        <h1>TimeSaga</h1>
            
                        <div className="links">
            
            
                            <Link to="/eventTopics">Теми</Link>
                            <Link to="/quizTopics">Тести</Link> 
                            <a>{this.state.userData.firstName} {this.state.userData.lastName}</a>
                            <a href="#"onClick={this.logOut}> Вийти</a>
                        </div>
            
                    </nav>
                :
                    <nav className="navbar">
                        <h1>TimeSaga</h1>

                        <div className="links">


                            <Link to="/sign-in">Вхід</Link>
                            <Link to="/sign-up">Реєстарація</Link> 

                        </div>

                    </nav>
                }
            </div>
        );
    }
}
 
