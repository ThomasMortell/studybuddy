import React from "react";
import { Switch, Route } from "react-router-dom";

import NavBar from "./NavBar/NavBar";
import Main from "./Main";
import Login from "./Login";
import Message from "./diplayMessages";
import "../css/rev.css"
import Groups from "./Groups/Groups"

import AppProfile from "./Profile/App";

const App = () => {
  return (
    <div className="App">
      <NavBar/>
      <div className="center">
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/profile" component={AppProfile} />
        <Route path="/message" component={Message} />
        <Route path="/login" component={Login} />
        <Route path="/groups" component={Groups} />
      </Switch>
 </div>
</div>
  );
};

export default App;
