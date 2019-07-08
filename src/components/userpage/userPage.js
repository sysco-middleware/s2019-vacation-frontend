import React from 'react';
import '../styling/general.css';
import '../styling/userpageStyling.css';
import Requests from './requests.js';
import VacationForm from './vacationForm.js';
import UserBox from './UserBox';
import {Col, Row, UncontrolledAlert} from 'reactstrap';
import axios from "axios";


export default class userPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: [],
            errorMsg: null,
            infoMsg: null,
            showRequestSpinner: false,
            showVacationFormSpinner: false,
            showUserBoxSpinner: false
        }
    }

    setShowRequestSpinner = (showRequestSpinner) => {
        this.setState({showRequestSpinner})
    };

    setShowVacationFormSpinner = (showVacationFormSpinner) => {
        this.setState({showVacationFormSpinner})
    };

    setShowUserBoxSpinner = (showUserBoxSpinner) => {
        this.setState({showUserBoxSpinner})
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

    fetchRequests = async () => {
        this.setShowRequestSpinner(true);
        if (this.props.loggedIn) {
            const {userId} = this.props.user;
            this.onErrorMsgChange(null);
            const response = await axios.get(`https://sysco-feri.herokuapp.com/api/user/${userId}/requests`)
                .catch(error => {
                    this.onErrorMsgChange("something went wrong! ");
                });

            console.log(response);
            if (response !== null && response !== undefined) {
                if (response.status === 200) {
                    this.setState({requests: response.data})
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
        this.setShowRequestSpinner(false)
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

        if (loggedIn || user !== null || user !== undefined) {
            return (
                <div>
                    {this.renderErrorMsg()}
                    {this.renderInfoMsg()}
                    <div className='userPage'>
                        <Row>
                            <Col md={4}>
                                <UserBox user={user} loggedIn={loggedIn} onErrorMsgChange={this.onErrorMsgChange}
                                         onInfoMsgChange={this.onInfoMsgChange}
                                         setShowUserBoxSpinner={this.setShowUserBoxSpinner}
                                         showUserBoxSpinner={this.state.showUserBoxSpinner}/>
                            </Col>
                            <Col md={4}>
                                <VacationForm user={user} loggedIn={loggedIn} onErrorMsgChange={this.onErrorMsgChange}
                                              fetchRequests={this.fetchRequests}
                                              onInfoMsgChange={this.onInfoMsgChange}
                                              setShowVacationFormSpinner={this.setShowVacationFormSpinner}
                                              showVacationFormSpinner={this.state.showVacationFormSpinner}/>
                            </Col>
                            <Col md={4}>
                                <Requests user={user} loggedIn={loggedIn} onErrorMsgChange={this.onErrorMsgChange}
                                          requests={this.state.requests}
                                          fetchRequests={this.fetchRequests}
                                          onInfoMsgChange={this.onInfoMsgChange}
                                          setShowRequestSpinner={this.setShowRequestSpinner}
                                          showRequestSpinner={this.state.showRequestSpinner}/>
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