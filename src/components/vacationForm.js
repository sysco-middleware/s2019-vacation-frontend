import React from 'react';
import './general.css';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from "axios";




export default class vacationForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      startDate: "",
      endDate: "",
      comment: ""
    }
  }

  makeRequest = async() => {
    this.props.onErrorMsgChange(null);
    const payload = {
      fromDate: this.state.startDate,
      toDate: this.state.endDate,
      comment: (this.state.comment !== null && this.state.comment.length > 0) ? this.state.comment : null,
      userId: this.props.user.userId
    };
    const response = await axios.post('https://sysco-feri.herokuapp.com/api/request', payload)
        .catch(error => {
          this.props.onErrorMsgChange("something went wrong! ");
        });

    console.log(response);
    if(response !== null && response !== undefined) {
      if (response.status === 200) {
          this.props.onInfoMsgChange("Request is created")
      } else {
        // to empty the input field
        this.props.onErrorMsgChange("something went wrong!");
      }
    }else{
      this.props.onErrorMsgChange("something went wrong!");
    }

    this.setState({
      startDate: "",
      endDate: "",
      comment: ""
    })
  };

  onStartDateChange = event => {
    this.setState({startDate: event.target.value});
  };

  onEndDateChange = event => {
    this.setState({endDate: event.target.value});
  };

  onCommentChange = event => {
    this.setState({comment: event.target.value});

  };

  render(){
    const {loggedIn, user} = this.props;

    if(loggedIn) {
      return (
          <React.Fragment>
            <Form className="vacationForm">
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label htmlFor="startDate">Start date</Label>
                    <Input type="date" name="startDate" id="startDate" value={this.state.startDate}
                           onChange={e => this.onStartDateChange(e)}/>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label htmlFor="endDate">End date</Label>
                    <Input type="date" name="endDate" id="endDate" value={this.state.endDate}
                           onChange={e => this.onEndDateChange(e)}/>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Label htmlFor="comment">Any comment?</Label>
                <Input type="textarea" name="comment" id="comment" placeholder="Anything we need to know?"
                       value={this.state.comment} onChange={e => this.onCommentChange(e)}/>
              </Row>

              <Button onClick={() => this.makeRequest()} id="knapp">Make your wishes come true</Button>
            </Form>
          </React.Fragment>

      );
    }else{
      return <div/>
    }
  }
}