import React, {Component} from 'react';
import '../styling/userpageStyling.css';

import Calender from 'react-calender';

export default class Kalender extends React.Component {
    constructor(props){
      super(props)
      this.state = {
      }
    }
  
    render(){
      return (
        <div className="calender">
            <h1>Sysco Vacation Form</h1>
        </div>
      );
    }
  }

