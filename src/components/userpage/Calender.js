import React, {Component} from 'react';
import Calendar from 'react-calendar';
import Moment from 'moment'
import { extendMoment } from 'moment-range';
import {Spinner} from "reactstrap";

const moment = extendMoment(Moment);

export default class Calender extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          date: new Date(),
          requests: []
      }
    }

    onDateChange = async (date, isDay) => {
        await this.setState({ date });
        if(isDay){
            this.onClickDay(date)
        }
    };

    onClickDay = async (date) => {
        const {requests} = this.props;
        const list = [];
        requests.map((r,i)=>{
            r.requestDates.map((d,i)=>{
                 if(moment(d).isSame(date, 'day')){
                    console.log("MATCH: "+ d);
                     if(!list.includes(r)){
                         list.push(r)
                     }
                }
            });
        });

        await this.setState({requests: list});
    };

    render(){
        const {requests, setShowAllRequestSpinner, showAllRequestSpinner, user, loggedIn} = this.props;

        if(loggedIn && user !== null && showAllRequestSpinner === false) {
            return (
                <div>
                    <Calendar
                        onChange={(date)=>this.onDateChange(date, false)}
                        value={this.state.date}
                        onClickDay={(date)=>this.onDateChange(date, true)}
                        showWeekNumbers={true}

                    />
                    {JSON.stringify(this.state.requests)}
                </div>
            );
        }else{
            return <Spinner style={{ width: '3rem', height: '3rem' }} />
        }
    }
  }

