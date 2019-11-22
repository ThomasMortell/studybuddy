import React, {Component} from 'react';
import {signout, signin} from '../store/actions/auth'
import AboutUs from './AboutUs'

class Navbar extends Component {
  render() {
    return(
  	  <div>
  		  <nav>
    		  <div className="nav-wrapper">
     			  <a href="#top" className="brand-logo" >Study Buddy</a>
      		  <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a href="" onClick={<AboutUs/>}>About Us</a></li>
              <li><a id="log-in" ref="loginBtn" href="http://localhost:3000/">Log In</a></li>
              <li><a id="log-out" className="logout-btn-navbar" onClick={() => signout()} ref="logoutBtn" href="">Log Out</a></li>
              <li><a id="profile" className="profile-btn-navbar" onClick={profile()} ref="profileBtn" href="">Profile</a></li>
      		  </ul>
    		  </div>
  		  </nav>
  	  </div>
    )
  }
}

const profile = function(){}
export default Navbar
