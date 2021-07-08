import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";

import Homepage from "./pages/Homepage";

import Editor from "./components/Editor/Editor";
import Signup from "./components/Singup/Signup";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/add" component={Editor} />
          <Route path="/signup" component={Signup} />
          <Route path="/homepage" component={Homepage} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
