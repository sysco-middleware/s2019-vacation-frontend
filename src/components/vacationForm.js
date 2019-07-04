import './general.css';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';




export default class vacationForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      startDate: "",
      endDate: ""
    }
  }
  
  render(){
    return (
      <React.Fragment>
      <Form className="vacationForm">
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label htmlFor="startDate">Start date</Label>
              <Input type="date" name="startDate" id="startDate" />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
            <Label htmlFor="endDate">End date</Label>
              <Input type="date" name="endDate" id="endDate" />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
         <Label htmlFor="comment">Any comment?</Label>
         <Input type="textarea" name="comment" id="comment" placeholder="Anything we need to know?"></Input>
        </Row>
      
        <Button id="knapp">Make your wishes come true</Button>
      </Form>
      </React.Fragment>

    );
  }
}