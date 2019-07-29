import React from 'react';
import '../styling/general.css';
import '../styling/userpageStyling.css';
import Requests from './requests.js';
import VacationForm from './vacationForm.js';
import UserBox from './UserBox';
import UserSuperiorBox from './UserSuperiorBox';
import Calender from './Calender';
import CalendarBig from './CalendarBig'
import {Col, Nav, NavItem, NavLink, Row, TabContent, TabPane, UncontrolledAlert} from 'reactstrap';
import axios from "axios";


export default class userPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allRequests: [],
            requests: [],
            errorMsg: null,
            infoMsg: null,
            superior: null,
            activeTab: '1',
            showRequestSpinner: false,
            showVacationFormSpinner: false,
            showUserBoxSpinner: false,
            showSuperiorBoxSpinner: false,
            showAllRequestSpinner: false,
        }
    }

    componentDidMount() {

        if (this.props.user.severaSuperiorGUID !== null && this.props.user.severaSuperiorGUID !== undefined) {
            this.fetchSuperior();
        }
        this.fetchAllRequests();

    }

    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    };

    setShowRequestSpinner = (showRequestSpinner) => {
        this.setState({showRequestSpinner})
    };

    setShowVacationFormSpinner = (showVacationFormSpinner) => {
        this.setState({showVacationFormSpinner})
    };

    setShowUserBoxSpinner = (showUserBoxSpinner) => {
        this.setState({showUserBoxSpinner})
    };

    setShowSuperiorBoxSpinner = (showSuperiorBoxSpinner) => {
        this.setState({showSuperiorBoxSpinner})
    };

    setShowAllRequestSpinner = (showAllRequestSpinner) => {
        this.setState({showAllRequestSpinner})
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
        const {userId} = this.props.user;
        this.onErrorMsgChange(null);
        const response = await axios.get(`https://sysco-feri.herokuapp.com/api/user/${userId}/requests`)
            .catch(error => {
                this.onErrorMsgChange("something went wrong! ");
            });

        console.log(response);
        if (response !== null && response !== undefined) {
            if (response.status === 200) {
                await this.setState({requests: response.data})
            } else {
                // to empty the input field
                this.onErrorMsgChange("something went wrong!");
            }
        } else {
            this.onErrorMsgChange("something went wrong!");
        }
        this.setShowRequestSpinner(false)
    };

    fetchAllRequests = async () => {
        this.setShowAllRequestSpinner(true);
        this.onErrorMsgChange(null);
        const response = await axios.get(`https://sysco-feri.herokuapp.com/api/request`)
            .catch(error => {
                this.onErrorMsgChange("something went wrong! ");
            });

        if (response !== null && response !== undefined) {
            if (response.status === 200) {
                await this.setState({allRequests: response.data})
            } else {
                // to empty the input field
                this.onErrorMsgChange("something went wrong!");
            }
        } else {
            this.onErrorMsgChange("something went wrong!");
        }
        this.setShowAllRequestSpinner(false)
    };

    fetchSuperior = async () => {
        this.setShowSuperiorBoxSpinner(true);
        const {severaSuperiorGUID} = this.props.user;
        this.onErrorMsgChange(null);
        const response = await axios.get(`https://sysco-feri.herokuapp.com/api/user/severa/${severaSuperiorGUID}`)
            .catch(error => {
                this.onErrorMsgChange("something went wrong! ");
            });

        console.log(response);
        if (response !== null && response !== undefined) {
            if (response.status === 200) {
                await this.setState({superior: response.data})
            } else {
                // to empty the input field
                this.onErrorMsgChange("something went wrong!");
            }
        } else {
            this.onErrorMsgChange("something went wrong!");
        }
        this.setShowSuperiorBoxSpinner(false)
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

        const localMenuStyle = {
            fontSize: '23px',
        };

        return (
            <div className='userPage'>
                {this.renderErrorMsg()}
                {this.renderInfoMsg()}
                <Nav style={{marginBottom: "15px"}} tabs>
                    <NavItem style={localMenuStyle}>
                        <NavLink
                            onClick={() => {
                                this.toggle('1');
                            }}>
                            Request
                        </NavLink>
                    </NavItem>
                    <NavItem style={localMenuStyle}>
                        <NavLink
                            onClick={() => {
                                this.toggle('2');
                            }}>
                            Calendar
                        </NavLink>
                    </NavItem>
                    <NavItem style={localMenuStyle}>
                        <NavLink
                            onClick={() => {
                                this.toggle('3');
                            }}>
                            BigCalendar
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col md={4}>
                                <UserBox user={user} onErrorMsgChange={this.onErrorMsgChange}
                                         onInfoMsgChange={this.onInfoMsgChange}
                                         setShowUserBoxSpinner={this.setShowUserBoxSpinner}
                                         showUserBoxSpinner={this.state.showUserBoxSpinner}/>
                            </Col>
                            <Col md={4}>
                                <VacationForm user={user}
                                              onErrorMsgChange={this.onErrorMsgChange}
                                              fetchRequests={this.fetchRequests}
                                              onInfoMsgChange={this.onInfoMsgChange}
                                              setShowVacationFormSpinner={this.setShowVacationFormSpinner}
                                              showVacationFormSpinner={this.state.showVacationFormSpinner}/>
                            </Col>
                            <Col md={4}>
                                <Requests onErrorMsgChange={this.onErrorMsgChange}
                                          requests={this.state.requests}
                                          fetchRequests={this.fetchRequests}
                                          onInfoMsgChange={this.onInfoMsgChange}
                                          setShowRequestSpinner={this.setShowRequestSpinner}
                                          showRequestSpinner={this.state.showRequestSpinner}/>
                            </Col>
                        </Row>
                        <Row>
                            {user.severaSuperiorGUID !== null && user.severaSuperiorGUID !== undefined ? (
                                <Col md={4}>
                                    <UserSuperiorBox user={this.state.superior}
                                                     onErrorMsgChange={this.onErrorMsgChange}
                                                     onInfoMsgChange={this.onInfoMsgChange}
                                                     showSuperiorBoxSpinner={this.state.showSuperiorBoxSpinner}/>
                                </Col>
                            ) : null}
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col md={12}>
                                <Calender user={user} loggedIn={loggedIn} requests={this.state.allRequests}
                                          setShowAllRequestSpinner={this.setShowAllRequestSpinner}
                                          showAllRequestSpinner={this.state.showAllRequestSpinner}/>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
                        <Row>
                            <Col md={12}>
                                <CalendarBig user={user} loggedIn={loggedIn} requests={this.state.allRequests}
                                             setShowAllRequestSpinner={this.setShowAllRequestSpinner}
                                             showAllRequestSpinner={this.state.showAllRequestSpinner}/>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}