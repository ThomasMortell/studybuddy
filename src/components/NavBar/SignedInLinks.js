import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signout } from '../../store/actions/auth'

const handleClick = (e) => {
  e.preventDefault();
  console.log(this.props)
}

const SignedInLinks = (props) => {
  return (
    <ul className="right">
      <li><NavLink to="#"></NavLink></li>
      <li><a onClick={props.signout}>Log out</a></li>
      <li><NavLink to="#" className="btn btn-floating pink lighten-1">User</NavLink></li>
    </ul>
  );
}

const mapDispathToProps = (dispatch) => {
  return {
    signout: () => dispatch(signout())
  }
}

export default connect(null, mapDispathToProps)(SignedInLinks)
