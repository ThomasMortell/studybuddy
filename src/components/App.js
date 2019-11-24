import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import firebase from "../services/firebase";

import Main from "./Main";
import Login from "./Login";
import Message from "./Message";
import Navbar from './layout/Navbar'
import CreateProfile from './auth/CreateProfile'
import "../css/rev.css"


class App extends Component{
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="center">
            <Switch>
              <Route exact path="/" component={Main} />
              <Route path="/login" component={Login} />
              <Route path="/createprofile" component={CreateProfile} />
              <Route path="/message" component={Message} />
              {/*<Route exact path="/profile" component={Profile} />*/}
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
