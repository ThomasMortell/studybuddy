import React from 'react'
import firebase from "../../services/firebase.js";

var db = firebase.firestore();

export const createGroup = () => {
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

export const searchGroups = () => {
	if(document.getElementById("groupSearch").value == ""){
		document.getElementById("groupDisplay").innerHTML = "Please enter a value and try again.";
	}
	else{
		let GroupCollection = db.collection('groups').doc(document.getElementById("groupSearch").value);
		GroupCollection.get()
		  .then(doc => {
			if (!doc.exists) {
			  document.getElementById("groupDisplay").innerHTML = "No Results.";
			} else {
			    //var bane = document.createElement('button').bane.onClick = joinGroup();
				//document.getElementById("groupDisplay").innerHTML = "Group Name: "+doc.id+" Module Code: "+doc.data().ModuleCode+" "+ bane;
				//var evil = '>';
				//document.getElementById("groupDisplay").innerHTML = "Group Name: "+doc.id+" Module Code: "+doc.data().ModuleCode+' <input type="button" value="Join Group" onClick={ ()=>joinGroup()}>';
			}
		  })
		  .catch(err => {
			document.getElementById("groupDisplay").innerHTML = "Error getting document: "+err;
		  });
	}
}

export const joinGroup = () => {
	alert("Hello");
	console.log('Button');
}
