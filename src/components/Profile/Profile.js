import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Form from './Form'
import ProfilePhoto from './ProfilePhoto'

const Profile = (props) => (
  <div className="container">
    <div className="row"></div>
    <div className="row">
      <div className="col s12 m12 l4">
        {/*<Header photo={props.photo} />*/}
        <ProfilePhoto image={props.photo} />
      </div>
      <div className="col s12 m12 l8">
        <Form values={props.profileFields} />
      </div>
    </div>
  </div>
)

Profile.propTypes = {
  photo: PropTypes.string.isRequired,
  profileFields: PropTypes.object.isRequired
}

export default Profile
