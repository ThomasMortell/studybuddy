import React from "react";
import { Switch, Route } from "react-router-dom";

import NavBar from "./NavBar";
import Main from "./Main";
import Login from "./Login";
import Message from "./Message";
import "../css/rev.css"

const App = () => {
  return (
    <div className="App">
      <NavBar/>
      <div className="center">
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/login" component={Login} />
          <Route exact path="/message" component={Message} />
      </Switch>
 </div>
    </div>
  );
};

export default App;
