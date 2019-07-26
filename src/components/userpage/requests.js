import React from 'react';
import '../styling/general.css';
import '../styling/userpageStyling.css';
import {Badge, Card, CardBody, CardTitle, Spinner, Table} from 'reactstrap';
import {withRouter} from 'react-router';
import RequestModal from './RequestModal'
import CardFooter from "reactstrap/es/CardFooter";

export class Requests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            request: null,
        }
    };


    toggleMod = (request) => {
        this.setState({
            modal: !this.state.modal,
            request: request
        });
    };

    componentDidMount() {
        this.props.fetchRequests()
    }

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
        const {requests, showRequestSpinner} = this.props;
//debugger
        if (requests !== null &&
            requests !== undefined &&
            requests.length > 0) {
            return (
                <Card className='cardBox'>
                    <CardTitle className='cardTitle'>Request history</CardTitle>
                    <CardBody className='cardBody'>
                        <Table size="sm" responsive hover>
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
                                    <tr style={{cursor: 'pointer'}} key={"request" + r.id + "" + i}
                                        onClick={() => this.toggleMod(r)}>
                                        <th scope="row">{r.requestId}</th>
                                        <td>{r.fromDate[2] + "-" + r.fromDate[1] + "-" + r.fromDate[0]}</td>
                                        <td>{r.toDate[2] + "-" + r.toDate[1] + "-" + r.toDate[0]}</td>
                                        <td><Badge color={this.getStatusColor(r.status)}>{r.status}</Badge></td>
                                        {(this.state.request !== null && this.state.request !== undefined) ?
                                            <RequestModal request={this.state.request} toggleMod={this.toggleMod}
                                                          modal={this.state.modal}/> : null}
                                    </tr>
                                );
                            })}
                            </tbody>
                        </Table>
                    </CardBody>
                    <CardFooter>
                        {showRequestSpinner === false ? (
                            <Badge style={{cursor: 'pointer', float: 'right'}}
                                   onClick={() => this.props.fetchRequests()} color="secondary" pill>Reload</Badge>
                        ) : (
                            <Spinner style={{width: '3rem', height: '3rem'}}/>
                        )
                        }
                    </CardFooter>
                </Card>
            );
        } else if (requests !== null &&
            requests !== undefined &&
            requests.length === 0) {
            return (
                <div>
                    <p>NO REQUESTS</p>
                </div>
            )
        } else {
            return (<div>
                <Spinner style={{width: '3rem', height: '3rem'}}/>{' '}
                <br/>
                <Badge style={{cursor: 'pointer'}} color="secondary" onClick={() => this.props.fetchRequests()}>Try
                    again</Badge>
            </div>)
        }
    }
}

export default withRouter(Requests)