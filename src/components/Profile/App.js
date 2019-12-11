import React from 'react'
import Profile from './Profile'
import './scss/main.scss'

export default class AppProfile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      photo: require('./scss/jane-doe.jpg'),
      profileFields: {
        firstName: '',
        studentNumber: '',
        degreeTitle: null,
        bio: null
      }
    }
  }

  render () {
    return (
      <div>
        <Profile profileFields={this.state.profileFields} photo={this.state.photo} />
      </div>
    )
  }
}

if (module.hot) module.hot.accept()
