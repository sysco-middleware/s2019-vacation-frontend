import React from 'react';
import '../styling/general.css';
import '../styling/userpageStyling.css';
import Requests from './requests.js';
import VacationForm from './vacationForm.js';
import UserBox from './UserBox';
import UserSuperiorBox from './UserSuperiorBox';
import Calender from './Calender';
import CalendarBig from './CalendarBig'
import {TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, UncontrolledAlert} from 'reactstrap';
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
        if(this.props.user !== null && this.props.loggedIn){
            if(this.props.user.severaSuperiorGUID !== null && this.props.user.severaSuperiorGUID !== undefined) {
                this.fetchSuperior();
            }
            this.fetchAllRequests();
        }
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
                    await this.setState({requests: response.data})
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

    fetchAllRequests = async () => {
        this.setShowAllRequestSpinner(true);
        if (this.props.loggedIn) {
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
        } else {
            this.props.history.push("/error");
        }
        this.setShowAllRequestSpinner(false)
    };

    fetchSuperior = async () => {
        this.setShowSuperiorBoxSpinner(true);
        if (this.props.loggedIn) {
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
        } else {
            this.props.history.push("/error");
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

        if (loggedIn && user !== null && user !== undefined) {
            return (
                <div>
                    {this.renderErrorMsg()}
                    {this.renderInfoMsg()}
                    <div className='userPage'>
                        <Nav style={{marginBottom: "15px"}} tabs>
                            <NavItem>
                                <NavLink
                                    onClick={() => { this.toggle('1'); }}>
                                    Request
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    onClick={() => { this.toggle('2'); }}
                                >
                                    Calendar
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    onClick={() => { this.toggle('3'); }}
                                >
                                    BigCalendar
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
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
                                <Row>
                                    {user.severaSuperiorGUID !== null && user.severaSuperiorGUID !== undefined?(

                                    <Col offset md={4}>
                                        <UserSuperiorBox user={this.state.superior} loggedIn={loggedIn} onErrorMsgChange={this.onErrorMsgChange}
                                                 onInfoMsgChange={this.onInfoMsgChange}
                                                 setShowSuperiorBoxSpinner={this.setShowSuperiorBoxSpinner}
                                                 showSuperiorBoxSpinner={this.state.showSuperiorBoxSpinner}/>
                                    </Col>
                                    ):(<div/>)}
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
                </div>

            );
        } else {
            this.handleNotLoggedIn();
            return <div/>
        }
    }
}