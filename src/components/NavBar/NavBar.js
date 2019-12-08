import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'


const Navbar = (props) => {
  const { auth } = props;
  const links = auth.uid ? <SignedInLinks /> : <SignedOutLinks />;
  return(
	  <nav id="navbar">
		  <div className="nav-wrapper">
 			  <a href="#top" className="brand-logo" >Study Buddy</a>
        { links }
		  </div>
	  </nav>
  )
}

const mapStateToProps = (state) =>{
  return{
    auth: state.firebaseReducer.auth
  }
}


export default connect(mapStateToProps)(Navbar)
