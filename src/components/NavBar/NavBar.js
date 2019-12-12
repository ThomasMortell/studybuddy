import React from 'react';
import { connect } from 'react-redux'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'


const Navbar = (props) => {
  const { auth } = props;

  const links = auth.uid ? <SignedInLinks /> : <SignedOutLinks />;

  return(
	  <nav id="nav">
		  <div className="nav-wrapper">
 			  <a href="/" className="brand-logo" >Study Buddy</a>
        { links }
		  </div>
	  </nav>
  )
}


function mapStateToProps(state){
  return{
    location: state.location,
    auth: state.firebaseReducer.auth
  }
}


export default connect(mapStateToProps)(Navbar)
