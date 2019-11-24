import React, { useState } from "react";
import { connect } from "react-redux";
import { signup, signin, resetPassword } from "../store/actions/auth";
import useForm from "../utils/useForm";
import validate from "../utils/validateLoginForm";
import bannerLogo from "../images/logo.png"
import Spinner from "./Spinner";

const Login = ({
  signup,
  signin,
  resetPassword,
  authMsg,
  history,
  loading}) => {
    const [newUser, setNewUser] = useState(false);
    const [reset, SetReset] = useState(false);
    const [credentials, handleChange, handleSubmit, errors] = useForm(
      login,
      validate,
      reset);

  function login() {
    if (newUser) {
      // signup
      signup(credentials.email, credentials.password);
    } else {
      if (reset) {
        // reset password
        resetPassword(credentials.email);
      } else {
        // signin
        signin(credentials.email, credentials.password, () => history.push("/"));
      }
    }
  }

  // Containerising loging page to split left side as sign in and right side as
  // logo with page heading
  return (
    <div className="">
      <div className="container">
        <div className="row">
          <div className="col s12 m6 vert-center" id="left-split">
            <div className="row">
              <i className="large material-icons prefix">https</i>
            </div>
            <div className="row">
              <p>
                {/*reset ? "Reset password" : newUser ? "Create an account" : "Sign in"*/}
                {authMsg && <p className="auth-message">{authMsg}</p>}
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="container">
                {/* Email */}
                <div className="input-field hori-center">
                  <input type= "email" id ="email" name="email"
                    value={credentials.email} onChange={handleChange}
                    className={(errors.emailIsEmpty || errors.emailFormatInvalid) && "input-error"}/>

                  <label className="email-placeholder" htmlFor="emailInput">email</label>
                  {errors.emailIsEmpty && <small>{errors.emailIsEmpty}</small>}
                  {errors.emailFormatInvalid && (<small>{errors.emailFormatInvalid}</small>)}
                </div>

                {/* PASSWORD */}
                {!reset && (
                  <div className="input-field hori-center">
                    <input type= "password" id ="password" name="password"
                      value={credentials.password} onChange={handleChange}
                      className={(errors.passIsStrong || errors.passIsEmpty) && "input-error"}/>

                    <label className="password-placeholder" htmlFor="password">password</label>
                    {errors.passIsStrong && <small>{errors.passIsStrong}</small>}
                    {errors.passIsEmpty && <small>{errors.passIsEmpty}</small>}
                  </div>
                )}

                {/* BUTTONS */}
                <div className="container">
                  <div className="row">
                    <button type="submit" className="btn-login">{
                      loading ? (
                          <Spinner />
                        ) : reset ? (
                          "Reset password"
                        ) : newUser ? (
                          "Create account"
                        ) : (
                          "Sign in"
                        )
                      }
                    </button>
                  </div>
                  <div className="row">
                    {!newUser && !reset && (
                      <a onClick={() => SetReset(true)} className="btn-forgot">Forgot password?</a>)
                    }
                  </div>
                  <div className="row">
                    <hr />
                  </div>
                  {reset && (
                    <button onClick={() => SetReset(false)} className="btn-forgot">Back to sign in</button>)
                  }
                  <div className="row">
                    <p>Don't have an account? No problem!<br />Click below to make your free account.</p>
                    <button onClick={() => {setNewUser(!newUser); if (reset) SetReset(false);}} className="btn-create">
                      {newUser ? "Sign in" : "Create an account"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="col s12 m6 vert-center" id="right-split">
            <img src={bannerLogo} className="logo" alt="studybuddy logo of an
              apple on top of books cartoonized" width="auto" height="200px">
            </img>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    authMsg: state.authReducer.authMsg,
    loading: state.apiStatusReducer.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signup: (email, password) => dispatch(signup(email, password)),
    signin: (email, password, callback) =>
      dispatch(signin(email, password, callback)),
    resetPassword: email => dispatch(resetPassword(email))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
