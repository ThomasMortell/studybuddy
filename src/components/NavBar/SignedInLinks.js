import React,{ Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signout } from '../../store/actions/auth'
import M from 'materialize-css'

// const handleClick = (e) => {
//   e.preventDefault();
//   console.log(this.props)
// }

class SignedInLinks extends Component{
//const SignedInLinks = (props) => {
  //const { auth } = props;
  //console.log(auth)
  constructor (props) {
    super(props)
  }

  componentDidMount() {
    M.AutoInit();
  }

  render (){
    console.log(this.props)
    return(
    <div>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="">Groups</NavLink></li>
        <li><NavLink to="/message">Messages</NavLink></li>
        <li><a onClick={this.props.signout} href="/">Log out</a></li>
        <li><NavLink to="/profile" className="btn btn-floating pink lighten-1">{this.props.auth.email.charAt(0)}</NavLink></li>
      </ul>

      <ul className="sidenav" id="mobile-demo">
        <li><NavLink to="/profile" className="pink lighten-2">Account: {this.props.auth.email}</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="">Groups</NavLink></li>
        <li><NavLink to="/message">Messages</NavLink></li>
        <li><a onClick={this.props.signout} href="/">Log out</a></li>
      </ul>

      <a href="#" data-target="mobile-demo" className="right sidenav-trigger">
      <i className="material-icons">menu</i>
      </a>
    </div>
  );
  }
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
