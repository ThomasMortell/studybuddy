import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { signout } from "../store/actions/auth";
import requireAuth from "./hoc/requireAuth";

const Main = ({ signout }) => {
  return (
  
  
    <div className="login-page">
      <button className="btn-switch" onClick={() => signout()}>Log out</button>
	  
	  <h1>Study Buddy</h1>
      <p id="Subtitle">A tool that helps students study together.</p>
		
	  <p id="groupCreate"> <button onClick={ ()=> createGroup()}>Create Groups</button> </p>
	  <form id="groupSearch">
		<input type="text" name="searchGroup" placeholder="Search Groups" />
		<input type="submit" name="submitSearchGroup" value="Search Groups" />
	  </form>
		
    </div>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.firebaseReducer.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signout: () => dispatch(signout())
  };
}

function createGroup(){
	
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  requireAuth
)(Main);
