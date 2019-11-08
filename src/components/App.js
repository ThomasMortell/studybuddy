import React from "react";
import { Switch, Route } from "react-router-dom";

import NavBar from "./NavBar";
import Main from "./Main";
import Login from "./Login";
import Bunny from "./Bunny";

const App = () => {
  return (
    <div className="App">
              <NavBar/>
                  <div className="login-page">
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/bunny" component={Bunny} />
      </Switch>
 </div>
    </div>
  );
};

export default App;
