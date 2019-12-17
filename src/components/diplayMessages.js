import React from "react";
import {render} from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import {compose} from "redux";
import {connect} from "react-redux";
import requireAuth from "./hoc/requireAuth";
import {signout} from "../store/actions/auth";
import firebase from "../services/firebase";
import moment from 'moment';
import Planner from  './Planner.js';

var db = firebase.firestore();
/*
var url = "";
url = window.location.href;
var group = "Finally";
var checker = false;

for(var i=url.length-1; i>=0&&checker===false; i--){

	if(url.charAt(i)==='/'){
		checker = true;
	}

	else if((url.charAt(i)==='0')&&(url.charAt(i-1)==='2')&&(url.charAt(i-2)==='%')){
		i=i-2;
		group = ' '+group;

	}

	else{
		group = url.charAt(i)+group;
	}
}

if(group.length>1){
	group = group.substring(0,1);
}
*/

var user = firebase.auth().currentUser;
let GroupCollection = db.collection('groups').doc("Finally").collection('messages');
var messageCount = GroupCollection.doc('--stats--').valueOf('count');
let messageArray = [];
let count = 0;
let mData = "";

class MessageDisplay extends React.Component {
  state = {
    items: messageArray,
    hasMore: false,
    messageSender: [],
    messageContent: []
  };

  componentDidMount() {
    GroupCollection.get().then(snapshot => {
      snapshot.forEach(doc => {
        messageArray.push(doc.id);
        this.state.messageSender.push(doc.get('Sender'));
        this.state.messageContent.push(doc.get('Message'));
        //console.log(group);
		console.log("Run Firsta");
        console.log(doc.get('Sender'));
        let check = doc.get('Sender');
        this.setState({items: messageArray});
      });
    }).catch(err => {
      console.log('Error getting documents', err);
    });
  }

  fetchMoreData = () => {
    if (this.state.items.length >= 500) {
        this.setState({hasMore: false});
        return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    var user = firebase.auth().currentUser;
    const admin = require('firebase-admin');
    let GroupCollection = db.collection('groups').doc("Finally").collection('messages');

    let getDoc = GroupCollection.doc('--stats--').get().then(doc => {
      if (!doc.exists) {
          console.log('No such document!');
      } else {
          console.log('Document data:', doc.data());
      }
    }).catch(err => {
      console.log('Error getting document', err);
    });
  };

  render() {
    return (
			<div className="container">
				<div className="row">
					<div className="col s12 m12 l4">
						<Planner/>
					</div>
		      <div className="col s12 m12 l4 message-board">
		        <h4>Message Board</h4>
		        <hr />
		        <InfiniteScroll
		          dataLength={this.state.items.length}
		          next={this.fetchMoreData}
		          hasMore={this.state.hasMore}
		          loader={<h4>Loading...</h4>}
		          height={350}>

		          <div className="container">
		            {this.state.items.map((i, index) => (
		              <div className="row">
		              {this.props.auth.email === this.state.messageSender[index] ? (
		                <div className="right">
		                  <div className="bubble-sent" >
		                    <p className="bubble-text">{this.state.messageContent[index]}</p>
		                  </div>
		                </div>) : (
		                  <div className="left">
		                    <div className="bubble-received" >
		                      <p className="message-received">{this.state.messageSender[index]}</p>
		                      <p className="bubble-text">{this.state.messageContent[index]}</p>
		                    </div>
		                  </div>
		                )
		              }
		              </div>
		            ))}
		          </div>
		        </InfiniteScroll>

            <form className="container message-form" id="sendField">
              <div className="row">
                <div className="col s8 m8 l8 left input-field message-send-field">
                  <input className="" type="text" id="messageField" name="messageField" autoComplete="off"/>
									<label htmlFor="messageField">Message</label>
                </div>
                <div className="col s4 m4 l4 right message-send-btn">
                  <input className="button" type="button" id="messageField" value="Send" onClick={() => sendMessage()}/>
                </div>
              </div>
            </form>
		      </div>
					<div className="col l4 hide-on-medium-and-down">
					</div>
				</div>
			</div>
    );
  }
}

function sendMessage(){
    var user = firebase.auth().currentUser;
    const admin = require('firebase-admin');
    const timestamp = moment() //Timestamp
        .valueOf()
        .toString()

    let GroupCollection = db.collection('groups').doc("Finally").collection('messages');
    GroupCollection.doc(timestamp +"_"+ user.email).set({   //message data
        Sender: user.email,
        Timestamp: timestamp,
        Message:document.getElementById("messageField").value,

    })
    const increment = firebase.firestore.FieldValue.increment(1); //keeps count of messages sent
    GroupCollection.doc('--stats--').update({count: increment});
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

render(<MessageDisplay/>, document.getElementById("root"));

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    requireAuth
)(MessageDisplay);
