import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";

import Homepage from "./pages/Homepage";

import Editor from "./components/Editor/Editor";
import Signup from "./components/Singup/Signup";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import { UserDetailsProvider } from "./contexts/UserDetailsContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <UserDetailsProvider>
          <Switch>
            <Route path="/add" component={Editor} />
            <Route path="/dashboard" component={UserDashboard} />
            <Route path="/signup" component={Signup} />
            <Route path="/homepage" component={Homepage} />
          </Switch>
        </UserDetailsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
