import jwt_decode from "jwt-decode";
import { Provider } from "react-redux";
import React, { Component } from "react";
import setAuthToken from "./utils/setAuthToken";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { setCurrentUser, logoutUser } from "./actions/authActions";
// Custom style
import "./App.css";

// Components
import Landing from "./components/layouts/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/customRoute/PrivateRoute";
import HomeRoute from "./components/customRoute/HomeRoute";
// Store
import store from "./store";
import Header from "./components/layouts/Header";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Landing} />
            <HomeRoute exact path="/register" component={Register} />
            <HomeRoute exact path="/login" component={Login} />
            <div className="index-page sidebar-collapse">
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;