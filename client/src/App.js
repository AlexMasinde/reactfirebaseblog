import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Editor from "./components/Editor/Editor";
import LatestArticles from "./components/Latest/LatestArticles";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/add" component={Editor} />
        <Route path="/homepage" component={LatestArticles} />
      </Switch>
    </Router>
  );
}

export default App;
