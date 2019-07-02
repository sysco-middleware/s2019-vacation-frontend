import React from 'react';
import './general.css';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';




export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      startDate: "",
      endDate: ""
    }
  }



  
  render(){
    return (
      <div className="vacationForm">
      <Form>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="startDate">Start date</Label>
              <Input type="date" name="startDate" id="startDate" />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
            <Label for="endDate">End date</Label>
              <Input type="date" name="endDate" id="endDate" />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
         <Label for="comment">Any comment?</Label>
         <Input type="textarea" name="comment" id="comment" placeholder="Anything we need to know?"></Input>
        </Row>
      
        <Button id="knapp">Sign in</Button>
      </Form>
 
      </div>
    );
  }
}