import React from 'react';
import '../styling/general.css';
import '../styling/userpageStyling.css';
import {Button, Col, Form, FormGroup, Input, Label, Row, Spinner, CustomInput,
    Card, CardBody, CardTitle } from 'reactstrap';
import axios from "axios";


export default class vacationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: "",
            endDate: "",
            comment: "",
            requestReason: "",
            reasons: []
        }
    }

    componentDidMount() {
        this.fetchReasons();
    }

    fetchReasons = async () => {
        const response = await axios.get('https://sysco-feri.herokuapp.com/api/request/reasons')
            .catch(error => {
                this.props.onErrorMsgChange("Something went wrong! ");
            });

        console.log(response);
        if (response !== null && response !== undefined) {
            if (response.status === 200) {
                this.setState({reasons: response.data})
            } else {
                // to empty the input field
                this.props.onErrorMsgChange("Something went wrong!");
            }
        } else {
            this.props.onErrorMsgChange("Something went wrong!");
        }
    };

    makeRequest = async () => {
        this.props.setShowVacationFormSpinner(true);
        this.props.onErrorMsgChange(null);
        this.props.onInfoMsgChange(null);

        const payload = {
            fromDate: this.state.startDate,
            toDate: this.state.endDate,
            comment: (this.state.comment !== null && this.state.comment.length > 0) ? this.state.comment : null,
            userId: this.props.user.userId,
            requestReason: this.state.requestReason
        };
        const response = await axios.post('https://sysco-feri.herokuapp.com/api/request', payload)
            .catch(error => {
                this.props.onErrorMsgChange("Something went wrong! ");
                this.setState({startDate: "", endDate: "", comment: "", requestReason: ""})
            });

        console.log(response);
        if (response !== null && response !== undefined) {
            if (response.status === 200) {
                this.props.onInfoMsgChange("Request was created");
                this.props.fetchRequests();
            } else {
                // to empty the input field
                this.props.onErrorMsgChange("Something went wrong!");
            }
        } else {
            this.props.onErrorMsgChange("Something went wrong!");
        }

        this.setState({startDate: "", endDate: "", comment: "", requestReason: ""});
        this.props.setShowVacationFormSpinner(false);
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

    onRequestReasonChange = event => {
        this.setState({requestReason: event.target.value});
    };

    render() {
        const {loggedIn, user, setShowVacationFormSpinner, showVacationFormSpinner} = this.props;

        if (loggedIn) {
            return (
                <Card className='cardBox'>
                    <CardTitle className='cardTitle'>Apply for leave</CardTitle>
                    <CardBody className='cardBody'>
                    <Form className="vacationForm">
                        <FormGroup>
                            <Label htmlFor="startDate">Start date*</Label>
                            <Input type="date" name="startDate" id="userPageDateInput"
                                   value={this.state.startDate}
                                   onChange={e => this.onStartDateChange(e)}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="endDate">End date*</Label>
                            <Input type="date" name="endDate" id="userPageDateInput" value={this.state.endDate}
                                   onChange={e => this.onEndDateChange(e)}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleCustomSelect">Reason*</Label>
                            <CustomInput type="select" id="exampleCustomSelect" name="customSelect">
                                {this.state.reasons.map((r,i)=>{
                                    return <option onClick={(e)=>this.onRequestReasonChange(e)} value={r}>{r}</option>
                                })}
                            </CustomInput>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="comment">Any comment?</Label>
                            <Input type="textarea" name="comment" id="userPageDateInput"
                                   placeholder="Anything we need to know?"
                                   value={this.state.comment} onChange={e => this.onCommentChange(e)}/>
                        </FormGroup>
                    </Form>
                    {showVacationFormSpinner === false ? <Button onClick={() => this.makeRequest()} id="vacationFormButton">Apply</Button> : <Spinner style={{ width: '3rem', height: '3rem' }} />}
                    </CardBody>
                </Card>

            );
        } else {
            return <div/>
        }
    }
}