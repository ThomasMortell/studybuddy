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
    const timestamp = moment()
        .valueOf()
        .toString()

    let GroupCollection = db.collection('groups').doc('george').collection('messages');
    GroupCollection.doc(timestamp +"_"+ user.email).set({
        Sender: user.email,
        Timestamp: timestamp,
        Message:document.getElementById("messageField").value,

    })


}

// function sendMessage(){
//     var user = firebase.auth().currentUser;
//     const timestamp = moment()
//         .valueOf()
//         .toString()
//
//     let GroupCollection = db.collection('groups').doc('george').collection('messages');
//     GroupCollection.doc(timestamp +"_"+ user.email).set({
//         Sender: user.email,
//         Timestamp: timestamp,
//         Message:document.getElementById("messageField").value,
//
//     })
//
//
// }



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