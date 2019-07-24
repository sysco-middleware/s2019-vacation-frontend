import React from 'react';
import '../styling/answerpage.css';
import { Button, Row, ButtonGroup, Col, Input } from 'reactstrap';

export default class AnswerPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
           
        }
    }


    render(){
      return (
        <div className=""> 
            <Row>
                <Input type="textarea" placeholder="Any comment?" id="comment" />
            </Row>           
            <Row>
                <ButtonGroup id="btn">
                    <Col>
                    <Button id="approvebtn">Approve</Button>
                    </Col>
                    <Col>
                    <Button id="denybtn">Deny</Button>
                    </Col>
                </ButtonGroup>
            </Row>
        </div>
      );
    }
  }