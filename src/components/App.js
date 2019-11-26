import React from "react";
import { Switch, Route } from "react-router-dom";

import NavBar from "./NavBar";
import Main from "./Main";
import Login from "./Login";
import Bunny from "./Bunny";
import AppProfile from "./Profile/App";

const App = () => {
  return (
    <div className="App">
              <NavBar/>

      <Switch>

        <Route exact path="/profile" component={AppProfile} />
        <div className="login-page">
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Main} />
        <Route exact path="/bunny" component={Bunny} />
        </div>
      </Switch>
 </div>
  );
};

export default App;
