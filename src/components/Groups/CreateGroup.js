import React from 'react'
import firebase from "../../services/firebase.js";

var db = firebase.firestore();

const CreateGroup = () => {
  return (
    <div class="groups" id="createGroupPage">
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
              <input className="button" type="button" value="Create Group" onClick={ ()=> createGroup()}/>
            </div>
    <p class="error" id="groupCreateError"></p>
          </div>
        </div>
      </form>
    </div>
  )
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

export default CreateGroup
