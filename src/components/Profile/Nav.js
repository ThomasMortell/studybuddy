import React from 'react'
import PropTypes from 'prop-types'
const Nav = (props) => (
  <nav>
    <h1>{props.title}</h1>
  </nav>
)

Nav.propTypes = {
  title: PropTypes.string.isRequired
}

export default Nav
