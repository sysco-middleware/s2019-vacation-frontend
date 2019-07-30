import React from "react";

import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Header from './components/header.js';
import Login from './components/authentication/login.js';
import UserPage from './components/userpage/userPage.js';
import SignUp from './components/authentication/signUp.js';
import AdminPage from './components/admin/AdminPage.js';
import axios from "axios";
import _ from "lodash";
import AnswerPage from "./components/answerpage/answerpage.js";
import {checkCookie} from "./components/authentication/cookie";

function NotFound() {
    return (
        <div>
            <h2>NOT FOUND: 404</h2>
            <p>
                ERROR: the page you requested in not available.
            </p>
        </div>
    )
}

export default class Router extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            loggedIn: false
        };
    }

    setLoggedIn = async (user) => {
        if (!_.isObject(user)) {
            user = await this.fetchUser(user)
        }
        if (user !== null && user !== undefined) {
            this.setState({
                user: user,
                loggedIn: true
            })
        } else {
            this.setState({
                user: null,
                loggedIn: false
            })
        }
    };

    fetchUser = async (email) => {
        const response = await axios.post('https://sysco-feri.herokuapp.com/api/login', {email})
            .catch(error => {
            });

        console.log(response);
        if (response !== null && response !== undefined) {
            if (response.status === 200) {
                return response.data
            }
            return null;
        }

    };

    componentDidMount() {
        if (!this.state.loggedIn) {
            this.setLoggedIn(checkCookie('email'));
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Header
                    user={this.state.user} loggedIn={this.state.loggedIn}
                    setLoggedIn={this.setLoggedIn}/>
                <Switch>
                    <Route exact path="/"
                           render={props => <Login {...props}
                                                   user={this.state.user}
                                                   loggedIn={this.state.loggedIn}
                                                   setLoggedIn={this.setLoggedIn}
                           />}/>
                    <Route exact path="/user"
                           render={props => (this.state.loggedIn && this.state.user) ?
                               <UserPage {...props}
                                         user={this.state.user}
                                         loggedIn={this.state.loggedIn}
                                         setLoggedIn={this.setLoggedIn}
                           /> : <NotFound/>}/>

                    <Route exact path="/admin"
                           render={props => (this.state.loggedIn && this.state.user) ?
                               <AdminPage {...props}
                                          user={this.state.user}
                                          loggedIn={this.state.loggedIn}
                                          setLoggedIn={this.setLoggedIn}
                               /> : <NotFound/>}/>

                    <Route exact path="/signUp"
                           render={props => <SignUp {...props}
                                                    user={this.state.user}
                                                    loggedIn={this.state.loggedIn}
                                                    setLoggedIn={this.setLoggedIn}
                           />}/>
                    <Route exact path="/answer/:requestId"
                           render={props => (this.state.loggedIn && this.state.user) ?
                               <AnswerPage {...props}
                                           user={this.state.user}
                                           loggedIn={this.state.loggedIn}
                                           setLoggedIn={this.setLoggedIn}
                           /> : <NotFound/>}/>

                    <Route><NotFound/></Route>
                </Switch>

            </BrowserRouter>
        );
    }
}

