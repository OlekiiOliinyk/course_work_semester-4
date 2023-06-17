import React, { Component } from 'react'
import "./styles/login.css"

export default class Login extends Component {
  
  constructor(props){
    super(props)
    this.state={
      email:"",
      password:"",
      errorMessage: '', 
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password}= this.state;
    console.log({ email, password});
  
    fetch("http://localhost:2000/login-user", {
      method: "POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
        email, password,
      })

    }).then((res) => res.json())
    .then((data) => {
      console.log(data, "userRegister");
      if(data.status === "ok"){
        
        window.localStorage.setItem("token", data.data);
        window.localStorage.setItem("loggedIn", true);
        window.location.href = "./eventTopics";
      }
      else{
        this.setState({ errorMessage: 'Неправильний пароль чи пошта' });
      }

    });
  }
  
  render() {

    const { errorMessage } = this.state;

    return (
        <div className="login-wrapper">
          <div className="login-inner">
            <form onSubmit={this.handleSubmit}>
              <h3>Увійти</h3>

              <div className="mb-3">
                <label>Електронна пошта</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  onChange={e => this.setState({email: e.target.value})}
                />
              </div>

              <div className="mb-3">
                <label>Пароль</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  onChange={e => this.setState({password: e.target.value})}
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Підтвердити
                </button>
              </div>

              {errorMessage && <h3>{errorMessage}</h3>}


              <p className="forgot-password text-right">
                Немає <a className='a-help' href="/sign-up">аккаунту?</a>
              </p>
            </form> 
        </div>
      </div>
    )

  }
}
