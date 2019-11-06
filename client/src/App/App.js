import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../actions/authActions";
import { Provider } from "react-redux";
import store from "../store";
import Nav from "./components/layout/Nav";
import { Redirector } from 'react-router-redirect';

import { Helmet } from 'react-helmet';

import Account from "./components/layout/Account/Account";


import Navbar from "./components/layout/AppNavbar";

// import SideNav from "./components/layout/SideNav";

import AddPost from "./components/layout/AddPost";
import Landing from "./components/layout/Landing";


import Register from "./components/auth/Register";
import GetUser from "./components/GetUserC";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import { Container } from "reactstrap";
import Home from "./pages/Home";
import admin from "./pages/admin";
import AddCV from "./components/layout/AddCV";
import adminCv from "./pages/adminCv";
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>

        <Router>
          <div className="App">
            <Redirector />
            <Navbar />
            {/* <Nav /> */}
            {/* <SideBar /> */}
            <Container>
              <Route exact path="/getuser" component={GetUser} />
              {/* <Route exact path="/HomePage" component={Landing} /> */}
              <Route exact path="/Profile" component={Account} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/homepage" component={Home} />
              <Route exact path="/addPost" component={AddPost} />
              <Route exact path="/addCV" component={AddCV} />
              <Route exact path="/admin" component={admin} />
              <Route exact path="/adminCv" component={adminCv} />

            </Container>
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;