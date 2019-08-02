import React from 'react';
import '../styling/general.css';
import '../styling/userpageStyling.css';
import {Button, Card, CardBody, CardTitle, Form, FormGroup, Input, Label, Spinner, Badge} from 'reactstrap';
import axios from "axios";
import _ from "lodash"
import ModalLeader from './leader_modal.js';


export default class vacationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: "",
            endDate: "",
            comment: "",
            reason: {},
            reasons: [],
            modal: false,
        };
    }

    componentDidMount() {
        this.fetchReasons();
    }

    fetchReasons = async () => {
        const response = await axios.get('https://sysco-feri.herokuapp.com/api/request/reasons')
            .catch(error => {
                this.props.onErrorMsgChange("Something went wrong! ");
            });

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
            requestReason: this.state.reason.requestReason,
            requestReasonId: this.state.reason.requestReasonId
        };
        const response = await axios.post('https://sysco-feri.herokuapp.com/api/request', payload)
            .catch(error => {
                this.props.onErrorMsgChange("Something went wrong! ");
                this.setState({startDate: "", endDate: "", comment: "", reason: {}})
            });

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

        this.setState({startDate: "", endDate: "", comment: "", reason: {}});
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

    onReasonChange = event => {
        this.setState({reason: this.state.reasons[event.target.value]});
    };

    toggleMod = () => {
        this.setState({
            modal: !this.state.modal,
        });
    };

    renderNoLeader = () => {
        const {user} = this.props;
        return (
            <div>
                <p>You need to select a leader to make a request <Badge color="info" style={{cursor: "pointer"}} onClick={()=>this.toggleMod()}>Set leader</Badge></p>
                <ModalLeader modal={this.state.modal} toggle={this.toggleMod} user={user}/>
            </div>
        );
    };


    render() {
        const {showVacationFormSpinner, user} = this.props;
        const {startDate, endDate, reason} = this.state;
        const disabledButton = (_.isEmpty(startDate) || _.isEmpty(endDate) || _.isEmpty(reason));


        return (
            <Card className='cardBox'>
                <CardTitle className='cardTitle'>Apply for leave</CardTitle>
                { user.superiorId !== null ? (
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
                                <Label htmlFor="reason">Reason*</Label>
                                <select className='vacationFormReasonDropDownMenu'
                                        onChange={(e) => this.onReasonChange(e)}>
                                    <option>SELECT</option>
                                    {this.state.reasons.map((r, i) => {
                                        return <option value={i}>{r.requestReason}</option>
                                    })}
                                </select>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="comment">Any comment?</Label>
                                <Input type="textarea" name="comment" id="userPageDateInput"
                                       placeholder="Anything we need to know?"
                                       value={this.state.comment} onChange={e => this.onCommentChange(e)}/>
                            </FormGroup>
                        </Form>
                        {showVacationFormSpinner === false ? (
                            <Button disabled={disabledButton} onClick={() => this.makeRequest()}
                                    id="vacationFormButton">Apply</Button>
                        ) : (
                            <Spinner style={{width: '3rem', height: '3rem'}}/>
                        )}
                    </CardBody>
                ) : <CardBody className='cardBody'>{this.renderNoLeader()}</CardBody>}
            </Card>
        );
    }
}
/*
                            <label htmlFor="select2" >Reason*</label>
                            <select value={this.state.reason} onChange={this.onReasonChange().bind(this)} className="form-control">
                                {this.state.reasons.map(option => {
                                    return <option value={option} key={option} >{option}</option>
                                })}
                            </select>


                            <Label for="exampleCustomSelect">Reason*</Label>
                            <CustomInput type="select" id="exampleCustomSelect" name="customSelect">
                                <select >SELECT</select>
                                {this.state.reasons.map((r, i) => {
                                    return <option onClick={(e) => this.onReasonChange(e)}
                                                   value={i}>{r.requestReason}</option>
                                })}
                            </CustomInput>

 */