import React from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import Moment from 'moment'
import {extendMoment} from 'moment-range';
import {Col, InputGroup, Row, Spinner} from "reactstrap";
import _ from "lodash";
import axios from "axios";
import SearchBar from './searchBar2.js';
import RequestModal from "./RequestModal";

const moment = extendMoment(Moment);

export default class CalendarBig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            term: "",
            reasons: [],
            reason: {},
            userColor: [],
            request: null
        }
    }

    toggleMod = (event) => {
        const {requests} = this.props;
        let foundRequest = null;
        if (requests !== null && requests !== undefined) {
            requests.map(r => {
                const eventTitle = event.title;
                const eventName = _.split(eventTitle, ":")[0];
                const name = r.user.firstName + " " + r.user.lastName;
                const from = moment(r.fromDate, "YYYY-MM-DD");
                const to = moment(r.toDate, "YYYY-MM-DD");
                if(moment(r.fromDate, "YYYY-MM-DD").isSame(event.start)&& moment(r.toDate, "YYYY-MM-DD").isSame(event.end) && eventName === name){
                    foundRequest = r;
                }
            });
            this.setState({
                modal: !this.state.modal,
                request: foundRequest
            });
        }
    };


    async componentWillReceiveProps(nextProps, nextContext) {
        const {requests} = nextProps;
        if (requests !== null && requests !== undefined) {
            await this.createEvents(requests);
            await this.attachColorToUser(requests)
        }
    }

    async componentDidMount() {
        const {requests, user, loggedIn} = this.props;
        if (user !== null && loggedIn && requests !== null && requests !== undefined) {
            await this.fetchReasons();
        }
    }

    attachColorToUser = async (requests) => {
        const userColor = [];
        requests.map((r,i)=> {
            if(r.status.toUpperCase()  === "APPROVED") {
                const user = r.user;
                const name = user.firstName + " " + user.lastName;
                const color = this.generateRandomColor();
                if (!this.checkIfUserColorIsSet(userColor, name)) {
                    userColor.push({name: name, color: color})
                }
            }
        });
        await this.setState({userColor})
    };

    checkIfUserColorIsSet = (list, name) => {
        let found = false;
        list.map(i => {
            if(i.name === name) found = true;
        });
        return found;
    };

    getUserColor = (name) => {
        let obj = null;
        this.state.userColor.map(c => {
            if(c.name === name) obj = c.color;
        });
        return obj;
    };

    generateRandomColor = () => {
        return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
    };


    createEvents = async (requests) => {
        const list = [];
        requests.map((r) => {
            if (r.status.toUpperCase() === "APPROVED") {
                const name = r.user.firstName + " " + r.user.lastName;
                const from = moment(r.fromDate, "YYYY-MM-DD");
                const to = moment(r.toDate, "YYYY-MM-DD");
                const event = {
                    title: name + ": " + r.requestReason,
                    start: from,
                    end: to,
                    allDay: true
                };
                list.push(event)
            }
        });
        await this.setState({events: list})
    };

    eventStyleHandler = (event, start, end, isSelected) => {
        const title = event.title;
        const name = _.split(title, ":")[0];
        const color = this.getUserColor(name) !== null ? this.getUserColor(name) : "blue";
        return {
            style: {
                backgroundColor: color
            }
        };
    };


    search = async () => {
        const {requests} = this.props;
        let term = this.state.term;
        const list = [];

        if (requests !== null && requests !== undefined && !_.isEmpty(term)) {
            requests.map((r) => {
                if (r.user.firstName.includes(term) ||
                    r.user.lastName.includes(term) ||
                    r.requestReason.includes(term)) {
                    list.push(r)
                }
            });
            await this.createEvents(list)
        } else {
            await this.createEvents(requests)
        }
    };


    fetchReasons = async () => {
        const response = await axios.get('https://sysco-feri.herokuapp.com/api/request/reasons')
            .catch(error => {
                this.props.onErrorMsgChange("Something went wrong! ");
            });
        if (response !== null && response !== undefined) {
            if (response.status === 200) {
                await this.setState({reasons: response.data})
            } else {
                // to empty the input field
                this.props.onErrorMsgChange("Something went wrong!");
            }
        } else {
            this.props.onErrorMsgChange("Something went wrong!");
        }
    };


    render() {
        const {showAllRequestSpinner, user, loggedIn} = this.props;

        if (loggedIn && user !== null && showAllRequestSpinner === false) {
            const localizer = momentLocalizer(moment);


            return (
                <div>
                    <Row style={{marginBottom: "15px"}}>
                        <Col md={{size: 4, order: 2, offset: 8}}>
                            <InputGroup>
                                <SearchBar createEvents={this.createEvents}/>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Calendar
                                localizer={localizer}
                                defaultDate={new Date()}
                                defaultView="month"
                                events={this.state.events}
                                style={{height: "100vh"}}
                                eventPropGetter={this.eventStyleHandler}
                                onSelectEvent={(event)=>this.toggleMod(event)}
                            />
                        </Col>
                        {(this.state.request !== null && this.state.request !== undefined) ? <RequestModal request={this.state.request} displaySensitive={false} toggleMod={this.toggleMod}  modal={this.state.modal}/> : null}
                    </Row>
                </div>
            );
        } else {
            return <Spinner style={{width: '3rem', height: '3rem'}}/>
        }
    }
}

