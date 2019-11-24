// /*
import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { signout } from "../store/actions/auth";
import requireAuth from "./hoc/requireAuth";
import firebase from "../services/firebase.js";


var db = firebase.firestore();

const Main = ({ signout }) => {
  return (
    <div id="homePage" className="container">
      <div className="row">
        <div class="col s6" id="createPage">
  			  <form id="createGroup">
            <i className="large material-icons prefix search-icon">group_add</i>
            <div className="row">
              <div className="col s12">
                <div className="row">
                  <div className="input-field col s12 vert-align">
  				          <input type="text" id="cgroupName" name="groupName"/>
                    <label htmlFor="cgroupName">group name</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12 vert-align">
                    <input type="text" id="cgroupModuleCode" name="moduleCode"/>
                    <label htmlFor="cgroupModuleCode">module code</label>
                  </div>
                </div>
                <div className="row">
                  <button onClick={ ()=> createGroup()}>Create group</button>
                </div>
              </div>
            </div>
  			  </form>
  		  </div>

        <div className="col s6">
          {/*<script src="https://www.gstatic.com/firebasejs/3.1.0/firebase-database.js"></script>*/}
          {/* Renders the search bar */}
          <i className="large material-icons prefix search-icon">group</i>
          <div className="row">
            <div className="col s12">
              <div className="row">
                <div className="input-field col s12 vert-align">
                  <i className="material-icons prefix search-icon">search</i>
                  <input type= "text" id ="groupSearch" name="searchGroup"/>
                  <label htmlFor="groupSearch">search for a group</label>
                  <a className="waves-effect waves-teal btn-flat search-btn" onClick={ ()=> searchGroups()}>Search</a>
                </div>
              </div>
            </div>
          </div>
          {/* Display any searched groups here */}
          <div class="row" id="groupDisplay">
          </div>
        </div>
      </div>
      <button onClick={ () => profile()} hidden>Profile</button>
      <button className="btn-switch" onClick={() => signout()}>Log out</button>
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

// function buildGroup(){
// 	document.getElementById("homePage").style.display = "none";
// 	document.getElementById("createPage").style.display = "block";
// }

function profile(){

}

// function back(){
// 	document.getElementById("homePage").style.display = "block";
// 	document.getElementById("createPage").style.display = "none";
// }

function logOut(){
  document.getElementById("navbar").style.display = "none";
  signout();
}

function searchGroups(){
	let GroupCollection = db.collection('groups').doc(document.getElementById("groupSearch").value);
	GroupCollection.get()
	  .then(doc => {
		if (!doc.exists) {
		  document.getElementById("groupDisplay").innerHTML = "No Results.";
		} else {
		  //console.log('Document data:', doc.data());
		  //var info = doc.data();

		var butstring = '<input type="button" value="Join Group" onClick={ ()=> joinGroup()}>'

		  document.getElementById("groupDisplay").innerHTML = "Group Name: "+doc.id+" Module Code: "+doc.data().ModuleCode + butstring;
		}
	  })
	  .catch(err => {
		document.getElementById("groupDisplay").innerHTML = "Error getting document: "+err;
	  });
}

function createGroup(){
		const GroupCollection = db.collection('groups');
		GroupCollection.doc(document.getElementById("cgroupName").value).set({
		ModuleCode:document.getElementById("cgroupModuleCode").value,
		Timetable: "",
		User0: "",
		User1: "",
		User2: "",
		User3: "",
		User4: "",
		User5: "",
		User6: "",
		User7: "",
		User8: "",
		User9: "",
	})
}

function joinGroup(){

}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  requireAuth
)(Main);

// */
