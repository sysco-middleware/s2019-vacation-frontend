import React from 'react';
import './general.css';
import { Table, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import axios from "axios";
import { withRouter } from 'react-router';

export class Requests extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      requests: []
    }
  }

  componentDidMount() {
    this.fetchRequests()
  }


  fetchRequests = async() => {
    this.setState({requests: []});
    const {loggedIn} = this.props;

    if(loggedIn) {
      const {userId} = this.props.user;
      this.props.onErrorMsgChange(null);
      const response = await axios.get(`https://sysco-feri.herokuapp.com/api/user/${userId}/1/25`)
          .catch(error => {
            this.props.onErrorMsgChange("something went wrong! ");
          });

      console.log(response);
      if (response !== null && response !== undefined) {
        if (response.status === 200) {
          this.setState({requests: response.data})
        } else {
          // to empty the input field
          this.props.onErrorMsgChange("something went wrong!");
        }
      } else {
        this.props.onErrorMsgChange("something went wrong!");
      }
    }else{
      this.props.history.push("/error");
    }
  };



  render(){
    const {loggedIn, user} = this.props;


    if(this.state.requests.length > 0 && loggedIn) {
      return (
          <Card>
            <CardBody>
              <CardTitle>REQUESTS</CardTitle>
              <Table bordered>
                <thead>
                <tr>
                  <th>#</th>
                  <th>From date</th>
                  <th>To date</th>
                  <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {this.state.requests.map((r, i) => {
                  return (
                      <tr key={"request" + r.id + "" + i}>
                        <th scope="row">{i}</th>
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
      return <div>NO REQUESTS</div>
    }
  }
}

export default withRouter(Requests)