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

var url = "";
url = window.location.href;

var checker = false;



var groupm = "Groupprojectdemo";



var user = firebase.auth().currentUser;
let group = "";
let messageArray = [];
let count = 0;
let mData = "";
let groupname = "data";
class MessageDisplay extends React.Component {
  state = {
    items: [],
    hasMore: false,
    messageSender: [],
    messageContent: [],
      messageGroup: "data"
  };

  componentDidMount() {

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

      groupname = group;

      this.state.messageGroup = group;
      let GroupCollection = db.collection('groups').doc(groupname).collection('messages');
      var messageCount = GroupCollection.doc('--stats--').valueOf('count');
    GroupCollection.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.state.items.push(doc.id);
        this.state.messageSender.push(doc.get('Sender'));
        this.state.messageContent.push(doc.get('Message'));
        console.log(doc.get('Message'));


        let check = doc.get('Sender');
        this.setState({items: messageArray});
      });
    }).catch(err => {
      console.log('Error getting documents', err);
    });


  }
    fetchMoreData = () => {
        if (this.state.items.length >= 200) {
            this.setState({hasMore: false});
            return;
        }
        // a fake async api call like which sends
        // 20 more records in .5 secs
        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        var user = firebase.auth().currentUser;
        const admin = require('firebase-admin');
        let GroupCollection = db.collection('groups').doc(groupname).collection('messages');

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
					<div className="col l4">
						<Planner/>
					</div>
		      <div className="col l5 message-board">
		        <h4>Message Board</h4>
		        <hr />
		        <InfiniteScroll
		          dataLength={this.state.messageSender.length}
		          next={this.fetchMoreData}
		          hasMore={this.state.hasMore}
		          loader={<h4>Loading...</h4>}
		          height={350}>

		          <div className="container">

		            {this.state.items.map((i, index) => (
		              <div className="row">
		              {this.props.auth.email === this.state.messageSender[index+1] ? (
		                <div className="right">
		                  <div className="bubble-sent" >
		                    <p className="bubble-text">{this.state.messageContent[index+1]}</p>
		                  </div>
		                </div>) : (
		                  <div className="left">
		                    <div className="bubble-received" >
		                      <p className="message-received">{this.state.messageSender[index+1]}</p>
		                      <p className="bubble-text">{this.state.messageContent[index+1]}</p>
		                    </div>
		                  </div>
		                )
		              }
		              </div>
		            ))}
		          </div>
		        </InfiniteScroll>

		        <div className="page">
		            <script src="https://www.gstatic.com/firebasejs/3.1.0/firebase-database.js"></script>
		              <div id="sendField" className="chat-form">
		                <form className="container message-form" id="sendField">
		                  <div className="row">
		                    <div className="col l8 input-field">
		                      <input className="message-text" type="text" id="messageField" name="messageField" autoComplete="off"/>
													<label htmlFor="messageField">Message</label>
		                    </div>
		                    <div className="col l4">
		                      <input className="button message-send-btn" type="button" value="Send" onClick={() => sendMessage()}/>
		                    </div>
		                  </div>
		                </form>
		            </div>
		        </div>
		      </div>
					<div className="col l4">
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

    let datadata = "Groupprojectdemo";


    let GroupCollection = db.collection('groups').doc(groupname).collection('messages');
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
