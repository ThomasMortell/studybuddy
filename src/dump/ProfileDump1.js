import React from 'react'
import PropTypes from 'prop-types'
import {BrowserRouter as Router,Route, Redirect,Switch} from 'react-router-dom';
import firebase from '../../services/firebase.js'


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
      studentNumber: '',
      degreeTitle: '',
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

  handleSubmit (event) {
    event.preventDefault()
    const {firstName, studentNumber, degreeTitle} = this.state;
    firebase.auth().onAuthStateChanged(function(user){
      var email = user.email;
      var { uid } = user;
      db.collection('users').doc(email).set({
        name: firstName,
        UserID: uid,
      });
    })

  }
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='firstName'>
          First Name
        </label>
        <input type='text' value={this.state.firstName} onChange={this.handleChange} name='firstName' />
        <label htmlFor='studentNumber'>
          Student Number
        </label>
        <input type='text' value={this.state.studentNumber} onChange={this.handleChange} name='studentNumber' />
        <label htmlFor='degreeTitle'>
          degreeTitle
        </label>
        <input type='text' value={this.state.degreeTitle} onChange={this.handleChange} name='degreeTitle' />
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
    studentNumber: PropTypes.string,
    degreeTitle: PropTypes.string,
    bio: PropTypes.string
  }).isRequired
}
