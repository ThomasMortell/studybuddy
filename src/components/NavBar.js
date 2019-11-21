import React, {Component} from 'react';
import {signout, signin, state} from '../store/actions/auth'

class Navbar extends Component {
  render() {
    return(
  	  <div>
  		  <nav>
    		  <div class="nav-wrapper">
     			  <a href="#top" class="brand-logo" >Study Buddy</a>
      		  <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li><a href="#">About Us</a></li>
              <li><a id="log-in" onClick={() => signin()} ref="loginBtn" href="">Log In</a></li>
              <li><a id="log-out" className="logout-btn-navbar" onClick={() => signout()} ref="logoutBtn" href="">Log Out</a></li>
              <li><a id="profile" className="profile-btn-navbar" onClick={ () => profile()} ref="profileBtn" href="">Profile</a></li>
      		  </ul>
    		  </div>
  		  </nav>
  	  </div>
    )
  }
}

const profile = function(){}
export default Navbar
