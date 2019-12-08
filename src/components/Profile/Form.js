import React from 'react'
import PropTypes from 'prop-types'
import firebase from '../../services/firebase.js'

const db = firebase.firestore();
let studentEmail = 'emailInit';

export default class Form extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            firstName: '',
            studentNumber: '',
            degreeTitle: '',
            bio: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount()
    {
        firebase.auth().onAuthStateChanged(user =>
        {

            if (!user)
            {
                alert("To view this page you must sign in, Redirecting to login...");
                window.location = '/';
            }
            else
            {
                studentEmail = user.email;
                let usersCollection = db.collection('users').doc(studentEmail);
                usersCollection.get().then(doc =>
                {
                    if (doc.exists)
                    {
                        //TODO: Make better error handling - check if data is undefined or null.
                        let studentName = doc.data().name;
                        this.changeState(studentName);
                    }
                });
            }
        });
    }

    changeState(name, stuNo, title, bio)
    {
        this.setState({firstName: name , studentNumber: stuNo, degreeTitle: title, bio: bio,});
    };

    handleChange(event)
    {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event)
    {
        event.preventDefault();
        const {firstName, studentNumber, degreeTitle, bio} = this.state;
        db.collection('users').doc(studentEmail).set({
            name: firstName,
            stuNo: studentNumber,
            title: degreeTitle,
            bio: bio

        }, {merge: true});
    }

    render()
    {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor='firstName'>
                    First Name
                </label>
                <input type='text' value={this.state.firstName} onChange={this.handleChange} name='firstName'/>
                <label htmlFor='studentNumber'>
                    Student Number
                </label>
                <input type='text' value={this.state.studentNumber} onChange={this.handleChange} name='studentNumber'/>
                <label htmlFor='degreeTitle'>
                    Degree Title
                </label>
                <input type='text' value={this.state.degreeTitle} onChange={this.handleChange} name='degreeTitle'/>
                <label htmlFor='bio'>
                    A bit about myself!
                </label>
                <textarea value={this.state.bio} onChange={this.handleChange} name='bio'/>
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
};
