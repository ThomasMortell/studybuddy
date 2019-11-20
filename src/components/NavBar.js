import React, {Component} from 'react';

class Navbar extends Component {

  render() {
  return(
  	<div>
  		<nav>
    		<div class="nav-wrapper">
     			 <a href="#top" class="brand-logo" >Study Buddy</a>
      				<ul id="nav-mobile" class="right hide-on-med-and-down">
      					 <li><a href="#top">About Us</a></li>
						<li><a class="hidden" ref="loginBtn" href="#top">Log In</a></li>
      				</ul>
    		</div>
  		</nav>
  	</div>
  
  		)
    }
}

export default Navbar