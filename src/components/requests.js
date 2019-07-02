import React from 'react';
import './general.css';
import { Table } from 'reactstrap';

export default class Requests extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render(){
    return (
      <div className="requests">
          <div id="table">

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
          <tr>
            <th scope="row">1</th>
            <td>2019-06-25</td>
            <td>2019-07-05</td>
            <td>PENDING</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
          </div>
      </div>
    );
  }
}