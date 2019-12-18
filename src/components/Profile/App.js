import React from 'react'
import Profile from './Profile'
import './scss/profile.scss'
import firebase from './../../services/firebase'
import ImageUpload from './ImageUploader/ImageUpload'

const storage = firebase.storage().ref();
const user = firebase.auth().currentUser;
let studentEmail = 'emailInit';

export default class AppProfile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      photo: '',
      profileFields: {
        firstName: '',
        studentNumber: '',
        degreeTitle: null,
        bio: null
      }

    }
    this.getImage('photo')
  }

getImage(image){
  firebase.auth().onAuthStateChanged(user =>
  {
    if(user){
      let studentEmail = user.email;
      storage.child(studentEmail + 'profilePicture/' + 'profiler').getDownloadURL().then((url) => {
        this.state[image] = url;
        this.setState(this.state);
      })
    }
  });
}

  render () {
    return (
      <div>
        <Profile profileFields={this.state.profileFields} photo={this.state.photo} />
        <ImageUpload />
      </div>
    )
  }
}

if (module.hot) module.hot.accept()
