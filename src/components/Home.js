import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { signout } from "../store/actions/auth";
import requireAuth from "./hoc/requireAuth";
import Searchbar from './layout/Searchbar'
import { createGroup, searchGroups, joinGroup } from '../store/actions/groups'

const Main = ({ signout }) => {
  return (
    <div id="homePage" className="container">
      <div className="row">
        <div className="col s12 m6" id="createPage">
  			  <form id="createGroup">
            <i className="large material-icons prefix search-icon">group_add</i>
            <div className="row">
              <div className="col s12 m12">
                <div className="row">
                  <div className="input-field col s12 m12 vert-align">
  				          <input type="text" id="cgroupName" name="groupName"/>
                    <label className="black-text" htmlFor="cgroupName">Group Name</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12 m12 vert-align">
                    <input type="text" id="cgroupModuleCode" name="moduleCode"/>
                    <label className="black-text" htmlFor="cgroupModuleCode">Module Code</label>
                  </div>
                </div>
                <div className="row">
                  <button onClick={ ()=> createGroup()}>Create Group</button>
                </div>
              </div>
            </div>
  			  </form>
  		  </div>

        <div className="col s12 m6">
          {/* Renders the search bar */}
          <Searchbar />
          {/* Display any searched groups here */}
          <div className="row" id="groupDisplay">
          </div>
        </div>
      </div>
      <button onClick={ () => profile()} hidden>Profile</button>
      <button name="btn-switch" onClick={() => signout()}>Log Out</button>
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

function profile(){

}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  requireAuth
)(Main);
