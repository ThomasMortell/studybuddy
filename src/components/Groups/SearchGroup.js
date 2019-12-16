import React from 'react'
import firebase from "../../services/firebase.js";
import ReactDOM from 'react-dom';

var db = firebase.firestore();

const SearchGroup = () => {
  return (
    <div class="groups" id="searchGroupPage">
      <i className="large material-icons prefix search-icon">group</i>
      <div className="row adjust-margin">
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
        <div className="table-div">
          <table id="groupDisplayTable">
          </table>
        </div>
      </div>
    </div>
  )
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


const ButtonA = ({ command }) => {
  const joinGroup = command => {

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
					window.location += 'message/' +command;
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
	window.location += 'message/' +command;
  }

  return (
    <button type="button" key={command} onClick={() => viewGroup(command)}>
      View Group
    </button>
  );
};


export default SearchGroup
