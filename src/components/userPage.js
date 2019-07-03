import React from 'react';
import './general.css';
import Requests from './requests.js';
import VacationForm from './vacationForm.js'; 
import {Row, Col} from 'reactstrap';


export default class userPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render(){
    return (
      <div className="userPage">
          <div>
              <Row>
                <Col md={8} >
                    <VacationForm/>
                </Col>
                <Col md={4} >
                    <Requests/>
                </Col>
              </Row>
          </div>
      </div>
    );
  }
}