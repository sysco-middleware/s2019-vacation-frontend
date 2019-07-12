import React from 'react';
import '../styling/general.css';
import '../styling/userpageStyling.css';
import RequestModal from '../userpage/RequestModal';
import axios from 'axios'
import _ from 'lodash'
import {readableTime} from "../../utils/unixTranslate";
import {randomString} from "../../utils/RandomString";
import {Card, CardBody, CardTitle, Badge, Table, UncontrolledCollapse, Spinner,} from 'reactstrap';



export default class AdminRequestsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            request: null,
        }
    }

    toggleMod = (request) => {
        this.setState({
            modal: !this.state.modal,
            request: request
        });
    };

    changeRequestStatus = async (status, requestId) => {
        const response = await axios.get(`https://sysco-feri.herokuapp.com/api/request/${requestId}/${status}`)
            .catch(error => {
                this.props.onErrorMsgChange("Something went wrong! ");
            });
        this.props.fetchAllRequests()
    };

    getStatusColor = (status) => {
        switch (status) {
            case "PENDING":
                return "warning";
            case "APPROVED":
                return "success";
            case "DENIED":
                return "danger";
            default:
                return "info"
        }
    };

    render() {
        const {loggedIn, user, requests, showAllRequestSpinner} = this.props;
        const randString = randomString()[0];

        if (loggedIn && user !== null && user !== undefined && user.roles.includes("ADMIN")) {
            return (
                <div>
                    <Card className="cardBox" >
                        <CardBody style={{
                            cursor: 'pointer',
                        }}
                        id={randString}>
                            <CardTitle>Requests<Badge style={{ marginLeft: '5px' }} color="secondary">{_.size(requests)}</Badge></CardTitle>
                        </CardBody>
                        <CardBody className="cardBody" style={{ marginTop: '-20px' }} >
                            <UncontrolledCollapse toggler={'#' + randString}>
                                <Table size="sm" hover responsive>
                                    <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>User</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>Reason</th>
                                        <th>Status</th>
                                        <th>created</th>
                                    </tr>
                                    </thead>
                                    {showAllRequestSpinner === false ? (
                                    <tbody>
                                    {_.map(requests, (request, i) => {
                                        return (
                                            <tr  key={i + 'klcwnoasdsa'}>
                                                <td>{request.requestId}</td>
                                                <td>{request.user.firstName+" "+request.user.lastName}</td>
                                                <td>{request.fromDate[2] + "-" + request.fromDate[1] + "-" + request.fromDate[0]}</td>
                                                <td>{request.toDate[2] + "-" + request.toDate[1] + "-" + request.toDate[0]}</td>
                                                <td>{request.requestReason}</td>
                                                <td><Badge color={this.getStatusColor(request.status)}>{request.status}</Badge></td>
                                                <td>{readableTime(request.created, true)}</td>
                                                <td>< Badge style={{cursor: "pointer"}} onClick={()=>this.toggleMod(request)} color="info">Open</Badge></td>
                                                {request.status.toUpperCase() === "PENDING" ? (
                                                    <div>
                                                        <td><Badge style={{cursor: "pointer"}} onClick={()=>this.changeRequestStatus("approve", request.requestId)} color="success">Approve</Badge></td>
                                                        <td>< Badge style={{cursor: "pointer"}} onClick={()=>this.changeRequestStatus("deny", request.requestId)} color="danger">Deny</Badge></td>
                                                    </div>
                                                    ) : (<div/>)
                                                }
                                                {(this.state.request !== null && this.state.request !== undefined) ? <RequestModal request={this.state.request} toggleMod={this.toggleMod}  modal={this.state.modal}/> : null}
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                    ):(
                                    <tbody>
                                    <Spinner style={{ width: '3rem', height: '3rem' }} />{' '}
                                    </tbody>
                                    )}
                                </Table>
                            </UncontrolledCollapse>
                        </CardBody>
                    </Card>
                </div>

            );
        } else {
            this.handleNotLoggedIn();
            return <div/>
        }
    }
}