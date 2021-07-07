import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Editor from "./components/Editor/Editor";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/add" component={Editor} />
        <Route path="/homepage" component={Homepage} />
      </Switch>
    </Router>
  );
}

export default App;
