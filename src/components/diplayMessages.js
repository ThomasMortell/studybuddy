import React from "react";
import {render} from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import {compose} from "redux";
import {connect} from "react-redux";
import requireAuth from "./hoc/requireAuth";
import {signout} from "../store/actions/auth";
import firebase from "../services/firebase";
import moment from 'moment';

var db = firebase.firestore();
const style = {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8
};


var user = firebase.auth().currentUser;
let GroupCollection = db.collection('groups').doc('george').collection('messages');
var messageCount = GroupCollection.doc('--stats--').valueOf('count');
let messageArray = [];
let count = 0;
let mData = "";




class messageDisplay extends React.Component {

    state = {
        items: messageArray,
        hasMore: false,
        messageSender: [],
        messageContent: []



    };
    componentDidMount() {
        GroupCollection.get()
            .then(snapshot => {
                snapshot.forEach(doc => {

                    messageArray.push(doc.id);
                    this.state.messageSender.push(doc.get('Sender'));
                    this.state.messageContent.push(doc.get('Message'));
                    console.log("Run Firsta");
                    console.log(doc.get('Sender'));
                    let check = doc.get('Sender');
                    this.setState({items: messageArray});






                });


            })
            .catch(err => {
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
        let GroupCollection = db.collection('groups').doc('george').collection('messages');

        let getDoc = GroupCollection.doc('--stats--').get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    console.log('Document data:', doc.data());
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });

    };

    render() {
        return (
            <div>
                <h1>Message your group below!</h1>
                <form id="sa">

                    {/*<input type="button" value="Send" onClick={() => getMessage()}/>*/}
                </form>
                <hr/>
                <InfiniteScroll
                    dataLength={this.state.items.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.hasMore}
                    loader={<h4>Loading...</h4>}
                    height={400}
                    endMessage={
                        <p style={{textAlign: "center"}}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >


                    {/*{messageArray.forEach((item) => {*/}
                    {/*{console.log(messageArray)}*/}
                    {/*{console.log(messageArray.length)}*/}
                    {console.log(this.state.items)}

                    {this.state.items.map((i, index) => (


                        <div style={style}>
                            {/*{console.log(GroupCollection.doc('1573746212542_georgemarshall@live.ie').get())}*/}

                                sender: {this.state.messageSender[index]}

                                message: {this.state.messageContent[index]}

                        </div>
                    ))},



                </InfiniteScroll>

                <div className="page">
                    <script src="https://www.gstatic.com/firebasejs/3.1.0/firebase-database.js"></script>
                      <div id="sendField">
                        <form id="sendField">
                            <input type="text" id="messageField" name="messageField" placeholder="message"/>
                            <input type="button" value="Send" onClick={() => sendMessage()}/>
                        </form>

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

    let GroupCollection = db.collection('groups').doc('george').collection('messages');
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




render(<messageDisplay/>, document.getElementById("root"));



export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    requireAuth
)(messageDisplay);
