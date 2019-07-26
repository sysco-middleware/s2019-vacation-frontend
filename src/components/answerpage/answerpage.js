import React from 'react';
import '../styling/answerpage.css';
import {withRouter} from "react-router-dom";
import {Badge, Button, ButtonGroup, Card, CardBody, CardText, CardTitle, Col, Input, Row, Spinner} from 'reactstrap';
import axios from "axios";
import {readableTime} from "../../utils/unixTranslate";

const getStatusColor = (status) => {
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

export class AnswerPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            request: null,
            comment: null,
            requestAnswered: false,
            showLoadingSpinner: false,
        }
    }

    async componentDidMount() {
        await this.fetchRequest();
    }

    setShowLoadingSpinner = (showLoadingSpinner) => {
        this.setState({showLoadingSpinner})
    };

    fetchRequest = async () => {
        this.setShowLoadingSpinner(true);
        const {createEvents} = this.props;
        const requestId = await this.props.match.params.requestId;
        const response = await axios.get(`https://sysco-feri.herokuapp.com/api/request/${requestId}`)
            .catch(error => {

            });

        console.log(response);
        if (response !== null && response !== undefined) {
            if (response.status === 200) {
                await this.setState({request: response.data});
                await this.checkIfRequestIsAnswered(response.data);
            } else {
                console.log("error")
            }
        }
        this.setShowLoadingSpinner(false);
    };

    checkIfRequestIsAnswered = async (request) => {
        if (request !== null && request !== undefined && request.status.toUpperCase() !== "PENDING") {
            await this.setState({requestAnswered: true})
        } else {
            await this.setState({requestAnswered: false})
        }
    };

    changeRequestStatus = async (status, requestId) => {
        this.setShowLoadingSpinner(true);
        const body = {
            status: status.toUpperCase(),
            comment: this.state.comment
        };
        const response = await axios.post(`https://sysco-feri.herokuapp.com/api/request/${requestId}`, body)
            .catch(error => {
                alert("Something went wrong!");
            });
        await this.fetchRequest();
        this.setShowLoadingSpinner(false);
    };

    onCommentChange = async (e) => {
        await this.setState({comment: e.target.value})
    };

    renderRequestInfo = () => {
        const {request} = this.state;
        if (request !== null && request !== undefined) {
            return (
                <div style={{marginLeft: "9%"}}>
                    <Card>
                        <CardBody>
                            <CardTitle>New Request</CardTitle>
                            <CardText>
                                <p><strong>Request
                                    number: </strong>{request.requestId !== null ? request.requestId : "No ID!"}</p>
                                <p>
                                    <strong>From: </strong>{request.fromDate !== undefined ? (request.fromDate[2] + "-" + request.fromDate[1] + "-" + request.fromDate[0]) : "No Date!"}
                                </p>
                                <p>
                                    <strong>To: </strong>{request.toDate !== undefined ? (request.toDate[2] + "-" + request.toDate[1] + "-" + request.toDate[0]) : "No Date!"}
                                </p>
                                <p><strong>Reason: </strong>{request.requestReason !== undefined ? (
                                    <Badge color='info'>{request.requestReason}</Badge>) : "No Reason!"}</p>
                                <p><strong>ReasonId: </strong>{request.requestReasonId !== undefined ? (
                                    <Badge color='info'>{request.requestReasonId}</Badge>) : "No ReasonId!"}</p>
                                <p><strong>Status: </strong>{request.status !== null ? <Badge
                                    color={getStatusColor(request.status)}>{request.status}</Badge> : "No Status"}</p>
                                <p>
                                    <strong>Comment: </strong>{request.comment !== null ? request.comment : "No comment!"}
                                </p>
                                <p>
                                    <strong>Created: </strong>{request.created !== null ? readableTime(request.created, true) : "No Date!"}
                                </p>
                            </CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        }
        return null;
    };

    renderRequest = () => {
        return (
            <div>
                <Row>
                    {this.renderRequestInfo()}
                </Row>
                <Row>
                    <Input type="textarea" value={this.state.comment} onChange={(e) => this.onCommentChange(e)}
                           placeholder="Any comment?" id="comment"/>
                </Row>
                <Row>
                    <ButtonGroup id="btn">
                        <Col>
                            <Button onClick={() => this.changeRequestStatus("approved", this.state.request.requestId)}
                                    id="approvebtn">Approve</Button>
                        </Col>
                        <Col>
                            <Button onClick={() => this.changeRequestStatus("denied", this.state.request.requestId)}
                                    id="denybtn">Deny</Button>
                        </Col>
                    </ButtonGroup>
                </Row>
            </div>
        );
    };

    renderNoRequest = () => {
        return (
            <div>
                <Spinner style={{width: '3rem', height: '3rem'}}/>{' '}
            </div>
        );
    };

    renderRequestAnswered = () => {
        return (
            <div>
                <h1>Request has been answered</h1>
                <p>The request was answered on {readableTime(this.state.request.created, true)}</p>
            </div>
        );
    };


    render() {
        const {request, requestAnswered} = this.state;
        const renderRequest = request !== null && request !== undefined && requestAnswered === false;

        return (
            <div className="">
                {requestAnswered ? this.renderRequestAnswered() : (renderRequest ? this.renderRequest() : this.renderNoRequest())}
            </div>
        );
    }
}

export default withRouter(AnswerPage);