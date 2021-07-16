import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { ArticlesProvider } from "./contexts/ArticlesContext";

import Homepage from "./pages/Homepage";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";

import Editor from "./components/Editor/Editor";
import Signup from "./components/Singup/Signup";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import ArticleView from "./components/ArticleView/ArticleView";

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
            <Route path="/categories/:category" component={CategoriesPage} />
            <Route path="/" component={Homepage} exact />
          </Switch>
        </ArticlesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
