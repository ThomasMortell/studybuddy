import React from "react";
import { Switch, Route } from "react-router-dom";

import NavBar from "./NavBar/NavBar";
import Main from "./Main";
import Login from "./Login";
import Message from "./Message";
import "../css/rev.css"
import Groups from "./Groups/Groups"
// import Profile from "./Profile/Profile"

const App = () => {
  return (
    <div className="App">
      <NavBar/>
      <div className="center">
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/message" component={Message} />
        <Route path="/groups" component={Groups} />
        {/* <Route path="/profile" component={Profile} />*/}
      </Switch>
 </div>
    </div>
  );
};

export default App;
