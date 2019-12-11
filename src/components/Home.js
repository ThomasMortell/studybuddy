import React from "react";
import ReactDOM from 'react-dom';
import { compose } from "redux";
//import "../css/Home.css";
import { connect } from "react-redux";
import { signout } from "../store/actions/auth";
import requireAuth from "./hoc/requireAuth";
import firebase from "../services/firebase.js";

var db = firebase.firestore();

const Main = ({ signout }) => {
  return (
    <div id="homePage" className="container">
      <div className="row">
        <div className="col s6" id="createPage">
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
                  <input type="button" value="Create Group" onClick={ ()=> createGroup()}/>
                </div>
				<p id="groupCreateError"></p>
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
          <div className="row" id="groupDisplay">
			<p id="groupDisplayError"></p>
			<table id="groupDisplayTable">
			</table>
          </div>
        </div>
      </div>

      {/*<button onClick={ () => profile()} hidden>Profile</button>*/}
      <button className="btn-switch" onClick={() => signout()}>Log Out</button>

      <button onClick={ () => profile()} hidden>Profile</button>
      {/*<button className="btn-switch" onClick={() => signout()}>Log Out</button>*/}
	  <p id="Haha">Let's Go Website!</p>

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



// function logOut(){
//   document.getElementById("navbar").style.display = "none";
//   signout();
//
}

function searchGroups(){
	if(document.getElementById("groupSearch").value === ""){
		document.getElementById("groupDisplayError").innerHTML = "Please enter a value and try again.";
	}
	else{
		var found = false;
		var count = 0;
		let GroupCollection = db.collection('groups').doc(document.getElementById("groupSearch").value);
		GroupCollection.get()
		  .then(doc => {
			if (doc.exists) {
				found = true;
				document.getElementById("groupDisplayError").innerHTML = "";
				document.getElementById("groupDisplayTable").innerHTML = '<tr id="groupDisplayTableHeader"><th>Group Name</th><th>Module Code</th><th>Join Or View Group</th></tr>';
				document.getElementById("groupDisplayTable").innerHTML += "<tr><td>"+doc.id+"</td><td>"+doc.data().ModuleCode+"</td><td class='groupDisplayTableButton'></td></tr>";
				if(firebase.auth().currentUser.email===(doc.data().User0||doc.data().User1||doc.data().User2||doc.data().User3||doc.data().User4||doc.data().User5||doc.data().User6||doc.data().User7||doc.data().User8||doc.data().User9)){
					ReactDOM.render(<ButtonB command={doc.id} />, document.getElementsByClassName('groupDisplayTableButton')[count]);
				}
				else if((""===doc.data().User0)||(""===doc.data().User1)||(""===doc.data().User2)||(""===doc.data().User3)||(""===doc.data().User4)||(""===doc.data().User5)||(""===doc.data().User6)||(""===doc.data().User7)||(""===doc.data().User8)||(""===doc.data().User9)){
					ReactDOM.render(<ButtonA command={doc.id} />, document.getElementsByClassName('groupDisplayTableButton')[count]);
				}
				else{
					document.getElementsByClassName('groupDisplayTableButton')[count].innerHTML = "Group Full";
				}
				count++;
			}
		  })
		  .catch(err => {
			document.getElementById("groupDisplayError").innerHTML = "Error getting document: "+err;
		  });

		  let GroupCollection2 = db.collection('groups');
			GroupCollection2.get()
				.then(snapshot => {
					snapshot.forEach(doc => {
						if(doc.get('ModuleCode') === document.getElementById("groupSearch").value)
						{
							document.getElementById("groupDisplayError").innerHTML = "";
							if(found === false){
								document.getElementById("groupDisplayTable").innerHTML = '<tr id="groupDisplayTableHeader"><th>Group Name</th><th>Module Code</th><th>Join Or View Group</th></tr>';
							}
							found = true;
							document.getElementById("groupDisplayTable").innerHTML += "<tr><td>"+doc.id+"</td><td>"+doc.data().ModuleCode+"</td><td class='groupDisplayTableButton'></td></tr>";
							if(firebase.auth().currentUser.email===(doc.data().User0||doc.data().User1||doc.data().User2||doc.data().User3||doc.data().User4||doc.data().User5||doc.data().User6||doc.data().User7||doc.data().User8||doc.data().User9)){
								ReactDOM.render(<ButtonB command={doc.id} />, document.getElementsByClassName('groupDisplayTableButton')[count]);
							}
							else if((""===doc.data().User0)||(""===doc.data().User1)||(""===doc.data().User2)||(""===doc.data().User3)||(""===doc.data().User4)||(""===doc.data().User5)||(""===doc.data().User6)||(""===doc.data().User7)||(""===doc.data().User8)||(""===doc.data().User9)){

								ReactDOM.render(<ButtonA command={doc.id} />, document.getElementsByClassName('groupDisplayTableButton')[count]);
							}

							else{
								document.getElementsByClassName('groupDisplayTableButton')[count].innerHTML = "Group Full";
							}
							count++;
						}
					});
					if(found === false){
						document.getElementById("groupDisplayError").innerHTML = "No Results.";
					}
				})
				.catch(err => {
					console.log('Error getting documents', err);
				});

	}
}

function createGroup(){
		let GroupCollection = db.collection('groups').doc(document.getElementById("cgroupName").value);
		GroupCollection.get()
		  .then(doc => {
			if (!doc.exists) {
				document.getElementById("groupCreateError").innerHTML = "Group created sucessfully.";

				const GroupCollection2 = db.collection('groups');
				GroupCollection2.doc(document.getElementById("cgroupName").value).set({
				ModuleCode:document.getElementById("cgroupModuleCode").value,
				Timetable: "",
				User0: "",//firebase.auth().currentUser.email,
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
			} else {
				document.getElementById("groupCreateError").innerHTML = "Group Name Already Exists.";
			}
		  })
		  .catch(err => {
			document.getElementById("groupCreateError").innerHTML = "Error getting document: "+err;
		  });
}

const ButtonA = ({ command }) => {
  const joinGroup = command => {
	alert(command);

	let GroupCollection3 = db.collection('groups').doc(command);
			GroupCollection3.get()
				.then(doc => {
					if(doc.data().User0===""){
						GroupCollection3.update({
							User0: firebase.auth().currentUser.email,
						})
					}
					else if(doc.data().User1===""){
						GroupCollection3.update({
							User1: firebase.auth().currentUser.email,
						})
					}
					else if(doc.data().User2===""){
						GroupCollection3.update({
							User2: firebase.auth().currentUser.email,
						})
					}
					else if(doc.data().User3===""){
						GroupCollection3.update({
							User3: firebase.auth().currentUser.email,
						})
					}
					else if(doc.data().User4===""){
						GroupCollection3.update({
							User4: firebase.auth().currentUser.email,
						})
					}
					else if(doc.data().User5===""){
						GroupCollection3.update({
							User5: firebase.auth().currentUser.email,
						})
					}
					else if(doc.data().User6===""){
						GroupCollection3.update({
							User6: firebase.auth().currentUser.email,
						})
					}
					else if(doc.data().User7===""){
						GroupCollection3.update({
							User7: firebase.auth().currentUser.email,
						})
					}
					else if(doc.data().User8===""){
						GroupCollection3.update({
							User8: firebase.auth().currentUser.email,
						})
					}
					else if(doc.data().User9===""){
						GroupCollection3.update({
							User9: firebase.auth().currentUser.email,
						})
					}
				})
				.catch(err => {
					console.log('Error getting documents', err);
				});


  }
  return (
    <button type="button" key={command} onClick={() => joinGroup(command)}>
      Join Group
    </button>
  );
};

const ButtonB = ({ command }) => {
  const viewGroup = command => {
	alert(command);
  };

  return (
    <button type="button" key={command} onClick={() => viewGroup(command)}>
      View Group
    </button>
  );
};

/*
class Button extends React.Component{

	joinGroup(command){
		alert(command);
	}

	render(){
		return(<button onClick={this.joinGroup.bind(this, this.props.command ) }>Join Group</button>);
	}


}
*/


export default compose(
		connect(
			mapStateToProps,
			mapDispatchToProps
		),
		requireAuth
	)(Main)
