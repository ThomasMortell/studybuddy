import React from 'react'
import PropTypes from 'prop-types'

const ProfilePhoto = (props) => (
  <div className='profile-photo hori-center'>
    <img src={props.image} className="responsive-img" alt='Profile' />
  </div>
)

ProfilePhoto.propTypes = {
  image: PropTypes.string
}

export default ProfilePhoto
