import React, { Component } from 'react'
import { signup } from '../../store/actions/auth'

class CreateProfile extends Component{
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }

  handleChange = (e) =>{
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    console.log(e);
  }

  render(){
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <form id="createProfile" onSubmit={this.handleSubmit}>
              <i className="large material-icons prefix search-icon">person_add</i>
              <div className="row">
                <div className="col s12 m12">
                  <div className="row">
                    <div className="input-field col s12 m12 vert-align">
                      <input type="text" id="firstName" onChange={this.handleChange}/>
                      <label htmlFor="firstName">First Name</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12 m12 vert-align">
                      <input type="text" id="lastName" onChange={this.handleChange}/>
                      <label htmlFor="lastName">Last Name</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12 m12 vert-align">
                      <input type="email" id="email" onChange={this.handleChange}/>
                      <label htmlFor="email">Email</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12 m12 vert-align">
                      <input type="password" id="password" onChange={this.handleChange}/>
                      <label htmlFor="password">Password</label>
                    </div>
                  </div>
                  <div className="row">
                    <button onClick={ ()=> signup() }>Create Profile</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateProfile;
