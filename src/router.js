import React from "react";

import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Header from './components/header.js';
import Login from './components/authentication/login.js';
import UserPage from './components/userpage/userPage.js';
import SignUp from './components/authentication/signUp.js';
import AdminPage from './components/admin/AdminPage.js';

export default class Router extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            loggedIn: false
        };
    }

    setLoggedIn = (user) => {
     if(user !== null && user !== undefined){
         this.setState({
             user: user,
             loggedIn: true
         })
     }else{
         this.setState({
             user: null,
             loggedIn: false
         })
     }
    };


    notFound = () => {
        return (
            <div>
                <h2>NOT FOUND: 404</h2>
                <p>
                    ERROR: the page you requested in not available.
                </p>
            </div>
        );
    };


    render() {

        return (
            <BrowserRouter>
                <Header
                    user={this.state.user} loggedIn={this.state.loggedIn}
                    setLoggedIn={this.setLoggedIn}/>

                <div>
                    <Switch>
                        <Route exact path="/"
                               render={props => <Login {...props}
                                                        user={this.state.user} loggedIn={this.state.loggedIn}
                                                       setLoggedIn={this.setLoggedIn}
                                                       />}/>
                        <Route exact path="/user"
                               render={props => <UserPage {...props}
                                                          user={this.state.user} loggedIn={this.state.loggedIn}
                                                          setLoggedIn={this.setLoggedIn}
                                                       />}/>
                        <Route exact path="/admin"
                               render={props => <AdminPage {...props}
                                                          user={this.state.user} loggedIn={this.state.loggedIn}
                                                          setLoggedIn={this.setLoggedIn}
                               />}/>
                        <Route exact path="/signUp"
                               render={props => <SignUp {...props}
                                                          user={this.state.user} loggedIn={this.state.loggedIn}
                                                          setLoggedIn={this.setLoggedIn}
                               />}/>
                        <Route component={this.notFound} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

