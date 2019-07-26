import React from 'react';
import "../styling/calendar.css"
import Calendar from 'react-calendar';
import Moment from 'moment'
import {extendMoment} from 'moment-range';
import {Badge, Col, ListGroup, ListGroupItem, ListGroupItemText, Row, Spinner} from "reactstrap";
import _ from "lodash";

const moment = extendMoment(Moment);

export default class Calender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            requests: [],
            request: null,
        }
    }

    onDateChange = async (date, isDay) => {
        await this.setState({date});
        if (isDay) {
            this.onClickDay(date)
        }
    };

    onClickDay = async (date) => {
        this.props.setShowAllRequestSpinner(true);
        const {requests} = this.props;
        const list = [];
        requests.map((r) => {
            if (r.status.toUpperCase() === 'APPROVED') {
                r.requestDates.map((d) => {
                    if (moment(d, "YYYY-MM-DD").isSame(date, 'day')) {
                        if (!list.includes(r)) {
                            list.push(r)
                        }
                    }
                });
            }
        });

        await this.setState({requests: list});
        this.props.setShowAllRequestSpinner(false);
    };

    setTileClassName = ({date, view}) => {
        const {requests} = this.props;
        if (view === 'month') {
            requests.map((r) => {
                r.requestDates.map((d) => {
                    if (moment(d, "YYYY-MM-DD").isSame(date, 'day')) {
                        return 'mark'
                    } else {
                        return null
                    }
                });
            })
        }
    };


    render() {
        const {showAllRequestSpinner, user, loggedIn} = this.props;

        if (loggedIn && user !== null && showAllRequestSpinner === false) {
            const date = moment(this.state.date).format("DD-MM-YYYY");
            return (
                <div>
                    <Row>
                        <Col md={4}>
                            <Calendar
                                onChange={(date) => this.onDateChange(date, false)}
                                value={this.state.date}
                                onClickDay={(date) => this.onDateChange(date, true)}
                                showWeekNumbers={true}
                                tileClassName={this.setTileClassName}
                            />
                        </Col>
                        <Col md={8}>
                            <h3 style={{
                                textDecoration: "underline"
                            }}>
                                {date} {_.size(this.state.requests) > 0 ? <Badge style={{marginLeft: '5px'}}
                                                                                 color="secondary">{_.size(this.state.requests)}</Badge> : null}</h3>
                            {this.state.requests.length > 0 ? (
                                <ListGroup>
                                    {
                                        this.state.requests.map((r, i) => {
                                            return (
                                                <ListGroupItem color='info'>
                                                    <ListGroupItemText>
                                                        <strong>{r.user.firstName + " " + r.user.lastName}</strong>
                                                        {" is going on a " + r.requestReason + " from " + r.fromDate[2] + "-" + r.fromDate[1] + "-" + r.toDate[0] + " to " + r.toDate[2] + "-" + r.toDate[1] + "-" + r.toDate[0]}
                                                    </ListGroupItemText>
                                                </ListGroupItem>
                                            )
                                        })
                                    }
                                </ListGroup>
                            ) : (
                                <p>No Request Registered</p>
                            )}
                        </Col>
                    </Row>
                </div>
            );
        } else {
            return <Spinner style={{width: '3rem', height: '3rem'}}/>
        }
    }
}

