import React from 'react';
import { connect } from 'react-redux'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'


const Navbar = (props) => {

  console.log(props);
  const { auth } = props;

  const links = auth.uid ? <SignedInLinks /> : <SignedOutLinks />;

  return(
    <div className="navbar">
  	  <nav id="nav">
  		  <div className="nav-wrapper">
   			  <a href="/" className="brand-logo" >Study Buddy</a>
          { links }
  		  </div>
  	  </nav>
      <ul className="sidenav" id="mobile-demo">
        <li><a href="sass.html">Sass</a></li>
        <li><a href="badges.html">Components</a></li>
        <li><a href="collapsible.html">JavaScript</a></li>
      </ul>
    </div>
  )
}


function mapStateToProps(state){
  return{
    location: state.location,
    auth: state.firebaseReducer.auth
  }
}


export default connect(mapStateToProps)(Navbar)
