import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Editor from "./components/Editor/Editor";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/add" component={Editor} />
      </Switch>
    </Router>
  );
}

export default App;
