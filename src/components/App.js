import React from "react";
import { Switch, Route } from "react-router-dom";

import NavBar from "./NavBar";
import Main from "./Main";
import Login from "./Login";
import Message from "./Message";
import messageDisplay from "./diplayMessages";
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
            <Route exact path="/test" component={messageDisplay}/>
      </Switch>
 </div>
    </div>
  );
};

export default App;
