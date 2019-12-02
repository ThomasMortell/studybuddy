import React from 'react'
import PropTypes from 'prop-types'
import {BrowserRouter as Router,Route, Redirect,Switch} from 'react-router-dom';
import firebase from '../../services/firebase.js'
import email from '../../store/actions/auth'

var user = firebase.auth().currentUser;

const db = firebase.firestore();
export default class Form extends React.Component {

  constructor (props) {
    firebase.auth().onAuthStateChanged(function(user) {
    if(!user){
       alert("To view this page you must sign in, Redirecting to login...")
       window.location = '/';
    }
    if(user){
      console.log(user.email);
    }
  });
    super(props)
    this.state = {
      firstName: '',
      jobTitle: '',
      birthday: '',
      bio: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
        this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit (event, email) {
    var email = user.ref(email);
    event.preventDefault()
    const {firstName, jobTitle, birthday} = this.state;
    db.collection('users').doc(email).set({
      Name: firstName
    }, {merge : true});
  }
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='firstName'>
          First Name
        </label>
        <input type='text' value={this.state.firstName} onChange={this.handleChange} name='firstName' />
        <label htmlFor='jobTitle'>
          Job Title
        </label>
        <input type='text' value={this.state.jobTitle} onChange={this.handleChange} name='jobTitle' />
        <label htmlFor='birthday'>
          Birthday
        </label>
        <input type='text' value={this.state.birthday} onChange={this.handleChange} name='birthday' />
        <label htmlFor='bio'>
          Bio
        </label>
        <textarea value={this.state.bio} onChange={this.handleChange} name='bio' />
        <button className='cta-primary' type='submit'>
          Save
        </button>
      </form>
    )
  }
}
Form.propTypes = {
  values: PropTypes.shape({
    firstName: PropTypes.string,
    jobTitle: PropTypes.string,
    birthday: PropTypes.string,
    bio: PropTypes.string
  }).isRequired
}
