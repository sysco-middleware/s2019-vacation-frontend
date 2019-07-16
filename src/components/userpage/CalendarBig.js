import React, {Component} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import Moment from 'moment'
import { extendMoment } from 'moment-range';
import {
    Spinner, Row, Col, InputGroup, InputGroupAddon, Button, Input, FormGroup, Label, CustomInput, Form
} from "reactstrap";
import _ from "lodash";
import axios from "axios";

const moment = extendMoment(Moment);

export default class CalendarBig extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            events: [],
            term: "",
            reasons: [],
            reason: {},
        }
    }

    onTermChange = (e) =>{
        this.setState({term: e.target.value})
    };

    async componentWillReceiveProps(nextProps, nextContext) {
        const {requests} = nextProps;
        if(requests !== null && requests !== undefined) {
            await this.createEvents(requests);
        }
    }

    async componentDidMount() {
        const {requests, user, loggedIn} = this.props;
        if(user !== null && loggedIn && requests !== null && requests !== undefined) {
            await this.fetchReasons();
        }
    }


    createEvents = async (requests) => {
        const list = [];
        requests.map((r,i)=>{
            if(r.status.toUpperCase() === "APPROVED"){
                const name = r.user.firstName+" "+r.user.lastName;
                const from = moment(r.fromDate, "YYYY-MM-DD");
                const to = moment(r.toDate, "YYYY-MM-DD");
                const event = {
                    title: name+": "+r.requestReason,
                    start: from,
                    end: to,
                    allDay: true
                };
                list.push(event)
            }
        });
        await this.setState({events: list})
    };


    search = async () => {
      const {requests} = this.props;
      let term = this.state.term;
      const list = [];

      if(requests !== null && requests !== undefined && !_.isEmpty(term)){
          requests.map((r,i)=>{
              if(r.user.firstName.includes(term) ||
                  r.user.lastName.includes(term) ||
                 r.requestReason.includes(term)){
                  list.push(r)
              }
          });
          await this.createEvents(list)
      }else{
          await this.createEvents(requests)
      }
    };

    clearSearch = async () => {
        await this.setState({
            term: "",
            reason: {}
        });
        await this.search();
    };



    generateRandomColor = () => {
        return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
    };


    onReasonChange = async event => {
        if(event.target.value !== null && event.target.value !== undefined) {
            await this.setState({
                reason: this.state.reasons[event.target.value],
                term: this.state.reasons[event.target.value].requestReason
            });
            await this.search(this.state.reason.requestReason);
        }else{
            await this.setState({term: ""});
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


    render(){
        const {requests, setShowAllRequestSpinner, showAllRequestSpinner, user, loggedIn} = this.props;

        if(loggedIn && user !== null && showAllRequestSpinner === false) {
            const localizer = momentLocalizer(moment);


            return (
                <div>
                    <Row style={{marginBottom: "15px"}}>
                        <Col md={{ size: 2, order:1, offset: 6 }}>
                            <FormGroup>
                                <CustomInput type="select" id="exampleCustomSelect" name="customSelect">
                                    <option onClick={()=>this.clearSearch()} >SELECT</option>
                                    {this.state.reasons.map((r,i)=>{
                                        return <option onClick={(e)=>this.onReasonChange(e)} value={i}>{r.requestReason}</option>
                                    })}
                                </CustomInput>
                            </FormGroup>
                        </Col>
                        <Col md={{ size: 4, order:2, offset: 8 }}>
                            <InputGroup>
                                <Input value={this.state.term} onChange={(e)=>this.onTermChange(e)} placeholder="Search"/>
                                <Button onClick={this.search} color="secondary">Search</Button>
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
                                style={{ height: "100vh" }}
                            />
                        </Col>
                    </Row>
                </div>
            );
        }else{
            return <Spinner style={{ width: '3rem', height: '3rem' }} />
        }
    }
}

