import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'

const Navbar = () => {
  return (
    <nav id="navbar">
      <div className="nav-wrapper">
        <Link to="/" className="navbar-logo">Study Buddy</Link>
        <SignedInLinks />
        <SignedOutLinks />
        {/*<a href="#top" className="brand-logo" >Study Buddy</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><a id="log-out" className="logout-btn-navbar" onClick={() => signout()} ref="logoutBtn" href="">Log Out</a></li>
          <li><a id="profile" className="profile-btn-navbar" onClick={profile()} ref="profileBtn" href="">Profile</a></li>
        </ul>*/}
      </div>
    </nav>
  );
}

export default Navbar;
