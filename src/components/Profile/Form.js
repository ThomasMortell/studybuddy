import React from 'react'
import PropTypes from 'prop-types'
import firebase from '../../services/firebase.js'
import {browserHistory} from "react-router";

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
            if(!user){
              window.location.href = "/";
            }
            if(user){
                studentEmail = user.email;
                let usersCollection = db.collection('users').doc(studentEmail);
                usersCollection.get().then(doc =>
                {
                    if (doc.exists)
                    {
                        //TODO: Make better error handling - check if data is undefined or null.
                        let studentName = doc.data().name;
                        this.changeState(studentName);

                        let studentno = doc.data().stuNo;
                        this.changeState1(studentno);

                        let degreename = doc.data().title;
                        this.changeState2(degreename);

                        let biography = doc.data().bio;
                        this.changeState3(biography);
                    }
                });
            }

        });
    }

    changeState(name, stuNo, title, bio)
    {
        this.setState({firstName: name, studentNumber: stuNo, degreeTitle: title, bio: bio});
    };
    changeState1(stuNo, title, bio)
    {
        this.setState({studentNumber: stuNo, degreeTitle: title, bio: bio});
    };
    changeState2(title, bio)
    {
        this.setState({degreeTitle: title, bio: bio});
    };
    changeState3(bio)
    {
        this.setState({bio: bio});
    };

    handleChange(event)
    {
        this.setState({
            [event.target.name]: event.target.value,
            [event.target.stuNo]: event.target.value,
            [event.target.title]: event.target.value,
            [event.target.bio]: event.target.value
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
          <div className="Profile">
            <form onSubmit={this.handleSubmit}>
                <label htmlFor='firstName' className="header">
                    First Name
                </label>
                <input type='text' value={this.state.firstName} onChange={this.handleChange} name='firstName'/>
                <label htmlFor='studentNumber' className="header">
                    Student Number
                </label>
                <input type='text' value={this.state.studentNumber} onChange={this.handleChange} name='studentNumber'/>
                <label htmlFor='degreeTitle' className="header">
                    Degree Title
                </label>
                <input type='text' value={this.state.degreeTitle} onChange={this.handleChange} name='degreeTitle'/>
                <label htmlFor='bio' className="header">
                    A bit about myself!
                </label>
                <textarea value={this.state.bio} onChange={this.handleChange} name='bio'/>
                <button className='cta-primary' type='submit'>
                    Save
                </button>
            </form>
            </div>
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
