import React from "react";
import ReactDOM from 'react-dom';
import { compose } from "redux";
import { connect } from "react-redux";
import { signout } from "../store/actions/auth";
import requireAuth from "./hoc/requireAuth";
import firebase from "../services/firebase.js";


var db = firebase.firestore();
var cheat;

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
                    <label htmlFor="cgroupName">Group Name</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12 vert-align">
                    <input type="text" id="cgroupModuleCode" name="moduleCode"/>
                    <label htmlFor="cgroupModuleCode">Module Code</label>
                  </div>
                </div>
                <div className="row">
                  <button onClick={ ()=> createGroup()}>Create Group</button>
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
                  <label htmlFor="groupSearch">Search For A Group</label>
                  <a className="waves-effect waves-teal btn-flat search-btn" onClick={ ()=> searchGroups()}>Search</a>
                </div>
              </div>
            </div>
          </div>
          {/* Display any searched groups here */}
          <div class="row" id="groupDisplay">
			<p id="groupDisplayError"></p>
			<table id="groupDisplayTable">
			</table>
          </div>
        </div>
      </div>
      <button onClick={ () => profile()} hidden>Profile</button>
      <button className="btn-switch" onClick={() => signout()}>Log Out</button>
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

function logOut(){
  document.getElementById("navbar").style.display = "none";
  signout();
}

function searchGroups(){
	if(document.getElementById("groupSearch").value == ""){
		document.getElementById("groupDisplayError").innerHTML = "Please enter a value and try again.";
	}
	else{
		let GroupCollection = db.collection('groups').doc(document.getElementById("groupSearch").value);
		GroupCollection.get()
		  .then(doc => {
			if (!doc.exists) {
			  document.getElementById("groupDisplayError").innerHTML = "No Results.";
			} else {
				document.getElementById("groupDisplayError").innerHTML = "";
				document.getElementById("groupDisplayTable").innerHTML = '<tr id="groupDisplayTableHeader"><th>Group Name</th><th>Module Code</th><th>Join Or Open Group</th></tr>';
				cheat = doc.id;
				document.getElementById("groupDisplayTable").innerHTML += "<tr><td>"+doc.id+"</td><td>"+doc.data().ModuleCode+"</td><td id='groupDisplayTableButton'></td></tr>";
				ReactDOM.render(<Button />, document.getElementById('groupDisplayTableButton'));
			}
		  })
		  .catch(err => {
			document.getElementById("groupDisplayError").innerHTML = "Error getting document: "+err;
		  });
		
		/*
		db.collection("groups").get().then(function(querySnapshot) {      	
			for(int i=0; i<querySnapshot.size; i++){
				let GroupCollection2 = db.collection('groups').doc[0]//(document.getElementById("groupSearch").value);	
			}
		});
		*/
	}
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

class Button extends React.Component{
	joinGroup(cheat){
		alert(cheat);
	}
	
	render(){
		return(<button onClick={this.joinGroup.bind(this, cheat)}>Join Group</button>);
	}
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  requireAuth
)(Main);
