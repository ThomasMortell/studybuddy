import React, {Component} from 'react';
import {signout, signin, state} from '../store/actions/auth'
import css from "../css/index.css";

class Navbar extends Component {

  render() {
  	  return(
  	    <div>
  	      <nav>
    	    <div class="nav-wrapper">
     	      <a href="http://localhost:3000/" class="navbar-logo" >Study Buddy</a>
      		    <ul id="nav-mobile" class="right hide-on-med-and-down">
      			  <li><a href="#">About Us</a></li>
				  <li><a id="log-in" onClick={() => signin()} ref="loginBtn" href="">Log In</a></li>
				  <li><a id="log-out" class="logout-btn-navbar" onClick={() => signout()} ref="logoutBtn" href="">Log Out</a></li>				  
      		    </ul>
    	    </div>
  		  </nav>
  	    </div>
  	  )
  }
}

export default Navbar