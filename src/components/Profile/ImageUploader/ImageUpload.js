import React, {Component} from 'react';
import {myStorage} from './../../../services/firebase';
import firebase from './../../../services/firebase'

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: '',
      progress: 0
    }
    this.handleChange = this
      .handleChange
      .bind(this);
      this.handleUpload = this.handleUpload.bind(this);
  }
  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({image}));
    }
  }
  handleUpload = () => {
      const {image} = this.state;
      const user = firebase.auth().currentUser;

      let studentEmail = user.email;
      const uploadTask = myStorage.ref(studentEmail + 'profilePicture/' + 'profiler');
      const Task = uploadTask.put(image);
      Task.on('state_changed',
      (snapshot) => {
        // progrss function ....
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({progress});
      },
      (error) => {
           // error function ....
        console.log(error);
      },
    () => {
        // complete function ....
        uploadTask.getDownloadURL().then(url => {
            console.log(url);
            this.setState({url});
        })
        window.location.href = "/profile";
    });
  }
  render() {
    const style = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    };
    return (
      <div style={style}>
      <progress value={this.state.progress} max="100"/>
      <br/>
        <input type="file" onChange={this.handleChange}/>
        <button onClick={this.handleUpload}>Upload</button>
      </div>
    )
  }
}

export default ImageUpload;
