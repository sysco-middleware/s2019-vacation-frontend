import React from 'react';
import '../styling/adminPageStyling.css';
import AdminRequestList from './AdminRequestsList'
import {Col, Row, UncontrolledAlert} from 'reactstrap';
import axios from "axios";
import {withRouter} from "react-router-dom";
import AdminUserList from "./AdminUserList";
import {checkCookie} from "../../utils/cookieHandler";

export class AdminPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allRequests: [],
            allUsers: [],
            allUsersSevera: [],
            errorMsg: null,
            infoMsg: null,
            showAllRequestSpinner: false,
            showAllUsersSpinner: false,
            showAllUsersSeveraSpinner: false,
        }
    }

    async componentDidMount() {
        const {user, loggedIn} = this.props;
        if (user !== null &&
            loggedIn &&
            user.roles !== undefined &&
            user.roles.includes("ADMIN")) {
            await this.fetchAllRequests();
            await this.fetchAllUsers();
            await this.fetchAllUsersSevera();
        }
    }

    setShowAllRequestSpinner = (showAllRequestSpinner) => {
        this.setState({showAllRequestSpinner})
    };

    setShowAllUsersSpinner = (showAllUsersSpinner) => {
        this.setState({showAllUsersSpinner})
    };

    setShowAllUsersSeveraSpinner = (showAllUsersSeveraSpinner) => {
        this.setState({showAllUsersSeveraSpinner})
    };


    handleNotLoggedIn = () => {
        this.props.history.push("/error");
    };

    onErrorMsgChange = (errorMsg) => {
        this.setState({errorMsg})
    };

    onInfoMsgChange = (infoMsg) => {
        this.setState({infoMsg})
    };

    fetchAllRequests = async () => {
        this.setShowAllRequestSpinner(true);
        if (this.props.loggedIn) {
            this.onErrorMsgChange(null);
            const response = await axios.get(`https://sysco-feri.herokuapp.com/api/request`)
                .catch(error => {
                    this.onErrorMsgChange("something went wrong! ");
                });

            console.log(response);
            if (response !== null && response !== undefined) {
                if (response.status === 200) {
                    this.setState({allRequests: response.data})
                } else {
                    // to empty the input field
                    this.onErrorMsgChange("something went wrong!");
                }
            } else {
                this.onErrorMsgChange("something went wrong!");
            }
        } else {
            this.props.history.push("/error");
        }
        this.setShowAllRequestSpinner(false)
    };

    fetchAllUsers = async () => {
        this.setShowAllUsersSpinner(true);

        if (checkCookie('loggedIn') === 'true') {
            //if (this.props.loggedIn) {

            this.onErrorMsgChange(null);
            const response = await axios.get(`https://sysco-feri.herokuapp.com/api/user`)
                .catch(error => {
                    this.onErrorMsgChange("something went wrong! ");
                });

            console.log(response);
            if (response !== null && response !== undefined) {
                if (response.status === 200) {
                    this.setState({allUsers: response.data})
                } else {
                    // to empty the input field
                    this.onErrorMsgChange("something went wrong!");
                }
            } else {
                this.onErrorMsgChange("something went wrong!");
            }
        } else {
            this.props.history.push("/error");
        }
        this.setShowAllUsersSpinner(false)
    };

    fetchAllUsersSevera = async () => {
        this.setShowAllUsersSeveraSpinner(true);

        if (checkCookie('loggedIn') === 'true') {
            //if (this.props.loggedIn) {

            this.onErrorMsgChange(null);
            const response = await axios.get(`https://sysco-feri.herokuapp.com/api/user/severa`)
                .catch(error => {
                    this.onErrorMsgChange("something went wrong! ");
                });

            console.log(response);
            if (response !== null && response !== undefined) {
                if (response.status === 200) {
                    this.setState({allUsersSevera: response.data})
                } else {
                    // to empty the input field
                    this.onErrorMsgChange("something went wrong!");
                }
            } else {
                this.onErrorMsgChange("something went wrong!");
            }
        } else {
            this.props.history.push("/error");
        }
        this.setShowAllUsersSeveraSpinner(false)
    };


    renderErrorMsg = () => {
        if (this.state.errorMsg !== null && this.state.errorMsg.length > 0) {
            return (<UncontrolledAlert color="warning">
                {this.state.errorMsg}
            </UncontrolledAlert>);
        } else {
            return <div/>
        }
    };

    renderInfoMsg = () => {
        if (this.state.infoMsg !== null && this.state.infoMsg.length > 0) {
            return (<UncontrolledAlert color="info">
                {this.state.infoMsg}
            </UncontrolledAlert>);
        } else {
            return <div/>
        }
    };

    render() {
        const {loggedIn, user} = this.props;

        if (checkCookie('loggedIn') === 'true' &&
            //loggedIn &&
            user !== null &&
            user !== undefined &&
            user.roles !== undefined &&
            user.roles.includes("ADMIN")) {
            return (
                <div className="adminPage">
                    {this.renderErrorMsg()}
                    {this.renderInfoMsg()}
                    <div>
                        <Row className="adminPage">
                            <Col md={12}>
                                <AdminRequestList user={user} loggedIn={loggedIn}
                                                  title={"Requests"}
                                                  onErrorMsgChange={this.onErrorMsgChange}
                                                  onInfoMsgChange={this.onInfoMsgChange}
                                                  requests={this.state.allRequests}
                                                  fetchAllRequests={this.fetchAllRequests}
                                                  setShowAllRequestSpinner={this.setShowAllRequestSpinner}
                                                  showAllRequestSpinner={this.state.showAllRequestSpinner}/>
                            </Col>
                        </Row>
                        <Row className="adminPage">
                            <Col md={12}>
                                <AdminUserList user={user} loggedIn={loggedIn} onErrorMsgChange={this.onErrorMsgChange}
                                               title={"Local Users"}
                                               isLocalUsers={true}
                                               users={this.state.allUsers}
                                               onInfoMsgChange={this.onInfoMsgChange}
                                               fetchAllUsers={this.fetchAllUsers}
                                               setShowAllUsersSpinner={this.setShowAllUsersSpinner}
                                               showAllUsersSpinner={this.state.showAllUsersSpinner}/>
                            </Col>
                        </Row>
                        <Row className="adminPage">
                            <Col md={12}>
                                <AdminUserList user={user} loggedIn={loggedIn} onErrorMsgChange={this.onErrorMsgChange}
                                               title={"Severa Users"}
                                               isLocalUsers={false}
                                               users={this.state.allUsersSevera}
                                               onInfoMsgChange={this.onInfoMsgChange}
                                               fetchAllUsers={this.fetchAllUsers}
                                               setShowAllUsersSpinner={this.setShowAllUsersSeveraSpinner}
                                               showAllUsersSpinner={this.state.showAllUsersSeveraSpinner}/>
                            </Col>
                        </Row>
                    </div>
                </div>

            );
        } else {
            this.handleNotLoggedIn();
            return <div/>
        }
    }
}

export default withRouter(AdminPage)