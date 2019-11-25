// /*
import React,{Component} from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { signout } from "../store/actions/auth";
import requireAuth from "./hoc/requireAuth";
import firebase from "../services/firebase.js";
import moment from 'moment';




var db = firebase.firestore();


class Message extends Component {
    render() {
        return (

            <div className="page">
                <script src="https://www.gstatic.com/firebasejs/3.1.0/firebase-database.js"></script>
                <p>Send Message</p>
                <div id="sendField">
                    <form id="sendField">
                        <input type="text" id="messageField" name="messageField" placeholder="message"/>
                        <input type="button" value="Send" onClick={() => sendMessage()}/>
                    </form>

                </div>
            </div>
        );
    }
};

function sendMessage(){
    var user = firebase.auth().currentUser;
    const admin = require('firebase-admin');
    const timestamp = moment() //Timestamp
        .valueOf()
        .toString()

    let GroupCollection = db.collection('groups').doc('george').collection('messages');
    GroupCollection.doc(timestamp +"_"+ user.email).set({   //message data
        Sender: user.email,
        Timestamp: timestamp,
        Message:document.getElementById("messageField").value,

    })
    const increment = firebase.firestore.FieldValue.increment(1); //keeps count of messages sent
    GroupCollection.doc('--stats--').update({count: increment});


}

function getMessage(){
     var user = firebase.auth().currentUser;
     let GroupCollection = db.collection('groups').doc('george').collection('messages');

}



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



export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    requireAuth
)(Message);

// */