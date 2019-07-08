import React from 'react';
import '../styling/general.css';
import '../styling/userpageStyling.css';
import {Button, Col, Form, FormGroup, Input, Label, Row, Spinner} from 'reactstrap';
import axios from "axios";


export default class vacationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: "",
            endDate: "",
            comment: "",
            showSpinner: false
        }
    }

    setShowSpinner = (showSpinner) => {
        this.setState({showSpinner})
    };

    makeRequest = async () => {
        this.setShowSpinner(true);
        this.props.onErrorMsgChange(null);
        this.props.onInfoMsgChange(null);

        const payload = {
            fromDate: this.state.startDate,
            toDate: this.state.endDate,
            comment: (this.state.comment !== null && this.state.comment.length > 0) ? this.state.comment : null,
            userId: this.props.user.userId
        };
        const response = await axios.post('https://sysco-feri.herokuapp.com/api/request', payload)
            .catch(error => {
                this.props.onErrorMsgChange("Something went wrong! ");
                this.setState({startDate: "", endDate: "", comment: ""})
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

        this.setState({startDate: "", endDate: "", comment: ""});
        this.setShowSpinner(false);
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

    render() {
        const {loggedIn, user} = this.props;

        if (loggedIn) {
            return (
                <div className='vacationColumn'>
                    <Form className="vacationForm">
                        <Row form>
                            <Col md={12}>
                                <FormGroup>
                                    <Label htmlFor="startDate">Start date</Label>
                                    <Input type="date" name="startDate" id="userPageDateInput"
                                           value={this.state.startDate}
                                           onChange={e => this.onStartDateChange(e)}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <FormGroup>
                                    <Label htmlFor="endDate">End date</Label>
                                    <Input type="date" name="endDate" id="userPageDateInput" value={this.state.endDate}
                                           onChange={e => this.onEndDateChange(e)}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Label htmlFor="comment">Any comment?</Label>
                            <Input type="textarea" name="comment" id="userPageDateInput"
                                   placeholder="Anything we need to know?"
                                   value={this.state.comment} onChange={e => this.onCommentChange(e)}/>
                        </Row>
                    </Form>
                    {this.state.showSpinner === false ? <Button onClick={() => this.makeRequest()} id="vacationFormButton">Send your wishes!</Button> : <Spinner style={{ width: '3rem', height: '3rem' }} />}
                </div>

            );
        } else {
            return <div/>
        }
    }
}