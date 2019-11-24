import React from 'react'
import { signup } from '../../store/actions/auth'

const CreateProfile = () =>{
  return (
    <div className="container">
      <div className="row">
        <div class="col">
          <form id="createProfile">
            <i className="large material-icons prefix search-icon">group_add</i>
            <div className="row">
              <div className="col s12 m12">
                <div className="row">
                  <div className="input-field col s12 m12 vert-align">
                    <input type="text" id="firstName" name="firstName"/>
                    <label htmlFor="firstName">First Name</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12 m12 vert-align">
                    <input type="text" id="lastName" name="lastName"/>
                    <label htmlFor="lastName">Last Name</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12 m12 vert-align">
                    <input type="email" id="email" name="email"/>
                    <label htmlFor="email">Email</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12 m12 vert-align">
                    <input type="password" id="password" name="password"/>
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

export default CreateProfile;
