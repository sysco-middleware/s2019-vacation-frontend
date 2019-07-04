import React from 'react';
import './general.css';
import { Table, Card, CardImg, CardText, CardBody, Row, Col,
  CardTitle, CardSubtitle, Button, Pagination, PaginationItem, PaginationLink, Spinner } from 'reactstrap';
import axios from "axios";
import { withRouter } from 'react-router';

export class Requests extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

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
                      <tr key={"request" + r.id + "" + i}>
                        <th scope="row">{r.requestId}</th>
                        <td>{r.fromDate[0] + "-" + r.fromDate[1] + "-" + r.fromDate[2]}</td>
                        <td>{r.toDate[0] + "-" + r.toDate[1] + "-" + r.toDate[2]}</td>
                        <td>{r.status}</td>
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