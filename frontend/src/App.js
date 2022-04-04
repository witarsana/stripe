import "./App.css";
import * as React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import Payment from "./pages/Payment";
import Result from "./pages/Result";
import Manage from "./pages/Manage";
import Cancel from "./pages/Cancel";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Payment />
          </Route>
          <Route exact path="/result/:status">
            <Result />
          </Route>
          <Route exact path="/manage">
            <Manage />
          </Route>
          <Route exact path="/cancel">
            <Cancel />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
