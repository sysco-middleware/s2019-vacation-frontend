import React from 'react';
import '../styling/general.css';
import '../styling/userpageStyling.css';
import { Table, Card, CardImg, CardText, CardBody, Row, Col,
  CardTitle, CardSubtitle, Button, Pagination, PaginationItem, PaginationLink, Spinner } from 'reactstrap';
import axios from "axios";
import { withRouter } from 'react-router';
import RequestModal from './RequestModal'

export class Requests extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modal: false
    }
  }


  toggleMod = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  componentDidMount() {
    this.props.fetchRequests()
  }

  render(){
    const {loggedIn, user, requests} = this.props;


    if(requests !== null &&
        requests !== undefined &&
      requests.length > 0 &&
        loggedIn) {
      return (
          <Card>
              <CardTitle>REQUESTS</CardTitle>
            <CardBody>
              <Table  size="sm"  responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>From date</th>
                    <th>To date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                {requests.map((r, i) => {
                  return (
                      <tr style={{cursor: 'pointer'}} key={"request" + r.id + "" + i} onClick={this.toggleMod}>
                        <th scope="row">{r.requestId}</th>
                        <td>{r.fromDate[0] + "-" + r.fromDate[1] + "-" + r.fromDate[2]}</td>
                        <td>{r.toDate[0] + "-" + r.toDate[1] + "-" + r.toDate[2]}</td>
                        <td>{r.status}</td>
                        <RequestModal request={r} toggleMod={this.toggleMod}  modal={this.state.modal}/>
                      </tr>
                  );
                })}
              </tbody>
              </Table>
            </CardBody>
          </Card>
      );
    }else{
      return (<div>
        <p>NO REQUESTS</p>
        <Spinner style={{ width: '3rem', height: '3rem' }} />{' '}
        <br/>
        <Button onClick={()=> this.props.fetchRequests()}>Try again</Button>
      </div>)
    }
  }
}

export default withRouter(Requests)