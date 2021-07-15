import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";

import Homepage from "./pages/Homepage";

import Editor from "./components/Editor/Editor";
import Signup from "./components/Singup/Signup";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import ArticleView from "./components/ArticleView/ArticleView";
import { ArticlesProvider } from "./contexts/ArticlesContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ArticlesProvider>
          <Switch>
            <Route path="/add" component={Editor} />
            <Route path="/dashboard" component={UserDashboard} />
            <Route path="/article/:id/:userId" component={ArticleView} />
            <Route path="/signup" component={Signup} />
            <Route path="/homepage" component={Homepage} />
          </Switch>
        </ArticlesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
