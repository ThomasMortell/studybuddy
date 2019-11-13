// /*
import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { signout } from "../store/actions/auth";
import requireAuth from "./hoc/requireAuth";
import firebase from "../services/firebase.js";
import css from "../css/Home.css";


var db = firebase.firestore();


const Main = ({ signout }) => {
  return (
  
    <div className="page">
		<script src="https://www.gstatic.com/firebasejs/3.1.0/firebase-database.js"></script>
		<button onClick={ () => profile()}>Profile</button>
		<button className="btn-switch" onClick={() => signout()}>Log out</button>
		  
		<h1>Study Buddy</h1>
		<p id="Subtitle">A tool that helps students study together.</p>

		<div id="homePage">
		  <p id="groupCreate"> <button onClick={ ()=> buildGroup()}>Create A Group</button> </p>
		  <form id="groupSearch">
			<input type="text" name="searchGroup" placeholder="Search Groups" />
			<input type="button" value="Search Groups" onClick={ ()=> searchGroups()} />
		  </form>
		</div>
		
		<div id="createPage">
			<form id="createGroup">
				<input type="text" id="cgroupName" name="groupName" placeholder="Group Name" />
				<input type="text" id="cgroupModuleCode" name="moduleCode" placeholder="Module Code" />
				<input type="button" value ="Create Group" onClick={ ()=> createGroup()} />
			</form>
			<button onClick={ () => back() } >Back</button>
		</div>
		
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

function buildGroup(){
	document.getElementById("homePage").style.display = "none";
	document.getElementById("createPage").style.display = "block";
}

function profile(){

}

function back(){
	document.getElementById("homePage").style.display = "block";
	document.getElementById("createPage").style.display = "none";
}

function searchGroups(){
	
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

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  requireAuth
)(Main);
 
// */