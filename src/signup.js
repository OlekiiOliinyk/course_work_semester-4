import React, { Component } from 'react'
import './styles/signup.css'

export default class SignUp extends Component {
  
  constructor(props){
    super (props)
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password:"",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  
  handleSubmit(e){
    e.preventDefault();

    const { firstName, lastName, email, password } = this.state;
  
    // Check if any of the fields are empty
    if (!firstName || !lastName || !email || !password) {
      console.log('Please fill in all fields');
      return;
    }

    console.log({firstName, lastName, email, password});
    fetch("http://localhost:2000/register", {
      method: "POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
        firstName, lastName, email, password
      })

    }).then((res) => res.json())
    .then((data) => {
      console.log(data, "userRegister");
    });
  }

  render() {
    return (
        <div className="auth-wrapper">
          <div className="auth-inner">
          <form onSubmit={this.handleSubmit}>


            <h3>Створити аккаунт</h3>

            <div className="mb-3">
              <label>Ім'я</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter first name"
                onChange={e => this.setState({firstName: e.target.value})}
              />
            </div>

            <div className="mb-3">
              <label>Прізвище</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Enter last name"
                onChange={e => this.setState({lastName: e.target.value})}
              />
            </div>

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
                Зареєструватися
              </button>
            </div>
            <p className="forgot-password text-right">
              Вже <a className='a-help' href="/sign-in">зареєстровані?</a>
            </p>
          </form>
        </div>
      </div>
    )
  }
}
