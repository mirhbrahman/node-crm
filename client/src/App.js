import jwt_decode from "jwt-decode";
import { Provider } from "react-redux";
import React, { Component } from "react";
import setAuthToken from "./utils/setAuthToken";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { setCurrentUser, logoutUser } from "./actions/authActions";
// Custom style
import "./App.css";
// Store
import store from "./store";
// Components
import Landing from "./components/layouts/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/customRoute/PrivateRoute";
import HomeRoute from "./components/customRoute/HomeRoute";
import Organization from "./components/organization/Organization";
import AddOrganization from "./components/organization/AddOrganization";
import EditOrganization from "./components/organization/EditOrganization";
import Lead from "./components/lead/Lead";
import AddLead from "./components/lead/AddLead";
import EditLead from "./components/lead/EditLead";
import Contact from "./components/contact/Contact";
import AddContact from "./components/contact/AddContact";
import EditContact from "./components/contact/EditContact";
import Opportunity from "./components/opportunity/Opportunity";
import AddOpportunity from "./components/opportunity/AddOpportunity";
import EditOpportunity from "./components/opportunity/EditOpportunity";

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
              <Switch>
                <PrivateRoute
                  exact
                  path="/organizations"
                  component={Organization}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-organizations"
                  component={AddOrganization}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-organizations/:id"
                  component={EditOrganization}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/leads" component={Lead} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-leads" component={AddLead} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-leads/:id"
                  component={EditLead}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/contacts" component={Contact} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-contacts"
                  component={AddContact}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-contacts/:id"
                  component={EditContact}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/opportunities"
                  component={Opportunity}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-opportunities"
                  component={AddOpportunity}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-opportunities/:id"
                  component={EditOpportunity}
                />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
