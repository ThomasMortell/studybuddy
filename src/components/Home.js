import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { signout } from "../store/actions/auth";
import requireAuth from "./hoc/requireAuth";

const Main = ({ signout }) => {
  return (
    <div className="page">
      <div>
        <span className="emoji" role="img" aria-label="House With Garden">
          🏡
        </span>
      </div>
      <h1>HomePage goes here</h1>
      <p>Sign in works!</p>
      <button className="btn-switch" onClick={() => signout()}>
        Log out
      </button>
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

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  requireAuth
)(Main);
