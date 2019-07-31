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
import {checkCookie} from "./utils/cookieHandler";
import {Spinner} from "reactstrap";

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
            loggedIn: false,
            loading: true
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

    async componentDidMount() {
        const self = this;
        // this timeout sets a loading bar to allow state to reset without rendering an temp error page
        await setTimeout(() => {
            self.setState({loading: false}); }, 100);
        if (!this.state.loggedIn) {
            await this.setLoggedIn(checkCookie('email'));
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <Spinner style={{width: '3rem', height: '3rem'}}/>
            )
        } else {
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
}

