import React from "react";

import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Header from './components/header.js';
import Login from './components/login.js';
import UserPage from './components/userPage.js';

export default class Router extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            errorMsg: null
        };
    }


    notFound() {
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
                <Header/>
                <div>
                    <Switch>
                        <Route exact path="/login"
                               render={props => <Login {...props}
                                                       />}/>
                        <Route exact path="/user"
                               render={props => <UserPage {...props}
                                                       />}/>
                      
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

