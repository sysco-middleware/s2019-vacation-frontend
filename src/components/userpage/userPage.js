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
            infoMsg: null
        }
    }

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
    };

    renderErrorMsg = () => {
        if (this.state.errorMsg !== null && this.state.errorMsg.length > 0) {
            return (<UncontrolledAlert color="primary">
                {this.state.errorMsg}
            </UncontrolledAlert>);
        } else {
            return <div/>
        }
    };

    renderInfoMsg = () => {
        if (this.state.errorMsg !== null && this.state.errorMsg.length > 0) {
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
                <div className='userPage'>
                    {this.renderErrorMsg()}
                    {this.renderInfoMsg()}
                    <Row>
                        <Col md={4}>
                            <UserBox user={user} loggedIn={loggedIn} onErrorMsgChange={this.onErrorMsgChange}
                                     onInfoMsgChange={this.onInfoMsgChange}/>
                        </Col>
                        <Col md={4}>
                            <VacationForm user={user} loggedIn={loggedIn} onErrorMsgChange={this.onErrorMsgChange}
                                          fetchRequests={this.fetchRequests}
                                          onInfoMsgChange={this.onInfoMsgChange}/>
                        </Col>
                        <Col md={4}>
                            <Requests user={user} loggedIn={loggedIn} onErrorMsgChange={this.onErrorMsgChange}
                                      requests={this.state.requests}
                                      fetchRequests={this.fetchRequests}
                                      onInfoMsgChange={this.onInfoMsgChange}/>
                        </Col>
                    </Row>
                </div>
            );
        } else {
            this.handleNotLoggedIn();
            return <div/>
        }
    }
}