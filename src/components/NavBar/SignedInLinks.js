import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signout } from '../../store/actions/auth'

// const handleClick = (e) => {
//   e.preventDefault();
//   console.log(this.props)
// }

const SignedInLinks = (props) => {
  const { auth } = props;

  console.log(auth)

  return (
    <div>
      <a href="#" data-target="mobile-demo" className="right sidenav-trigger"><i className="material-icons">menu</i></a>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
      <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="">Groups</NavLink></li>
        <li><NavLink to="/message">Messages</NavLink></li>
        <li><a onClick={props.signout} href="/">Log out</a></li>
        <li><NavLink to="/profile" className="btn btn-floating pink lighten-1">{auth.email.charAt(0)}</NavLink></li>
      </ul>
    </div>
  );
}

function mapStateToProps(state){
  return{
    auth: state.firebaseReducer.auth
  }
}

const mapDispathToProps = (dispatch) => {
  return {
    signout: () => dispatch(signout())
  }
}

export default connect(mapStateToProps, mapDispathToProps)(SignedInLinks)
