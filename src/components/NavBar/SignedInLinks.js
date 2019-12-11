import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signout } from '../../store/actions/auth'

// const handleClick = (e) => {
//   e.preventDefault();
//   console.log(this.props)
// }

const SignedInLinks = (props) => {
  return (
    <div>
      <a href="#" data-target="mobile-demo" className="right sidenav-trigger"><i className="material-icons">menu</i></a>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><NavLink to="/groups">Groups</NavLink></li>
        <li><NavLink to="/profile">Profile</NavLink></li>
        <li><NavLink to="/test">Messages <span className="new badge">4</span></NavLink></li>
        <li><a onClick={props.signout} href="/">Log out</a></li>
        <li><NavLink to="/" className="btn btn-floating pink lighten-1">User</NavLink></li>
      </ul>
    </div>
  );
}

const mapDispathToProps = (dispatch) => {
  return {
    signout: () => dispatch(signout())
  }
}

export default connect(null, mapDispathToProps)(SignedInLinks)
