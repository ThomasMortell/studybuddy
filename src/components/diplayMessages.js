import React from "react";
import {render} from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import {compose} from "redux";
import {connect} from "react-redux";
import requireAuth from "./hoc/requireAuth";
import {signout} from "../store/actions/auth";
import firebase from "../services/firebase";

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
let messageArray = ["hr","dfsdf"];
GroupCollection.get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            messageArray.push(doc.id);
        });
    })
    .catch(err => {
        console.log('Error getting documents', err);
    });


class messageDisplay extends React.Component {

    state = {
        items: [1,2,3,4,5,6,7,8,9,10],
        hasMore: true,
        messagesLeft: messageCount,


    };

    fetchMoreData = () => {
        if (this.state.items.length >= 500) {
            this.setState({hasMore: false});
            return;
        }
        // a fake async api call like which sends
        // 20 more records in .5 secs
        let x = this.messageData;
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
            <div>[
                <h1>demo: react-infinite-scroll-component</h1>
                <form id="sa">

                    <input type="button" value="Send" onClick={() => getMessage()}/>
                </form>
                <hr/>
                <InfiniteScroll
                    dataLength={20}
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
                    {/*    console.log(item)*/}
                    {/*})}*/}
                    {messageArray.map((i, index) => (
                        <div style={style} key={index}>
                            div - #{index}
                        </div>
                    ))},
                    {console.log(messageArray.length)},
                    {console.log(messageArray)}

                </InfiniteScroll>
            </div>
        );
    }
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

function getMessage() {
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


}



render(<messageDisplay/>, document.getElementById("root"));



export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    requireAuth
)(messageDisplay);