import React from 'react';
import './general.css';
import {Button, Col, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Row} from "reactstrap";
import axios from 'axios';

export default class signUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exists: false,
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
            errorMsg: null,
        }
    }

    onEmailChange = event => {
        this.setState({email: event.target.value});
    };

    onFirstNameChange = event => {
        this.setState({firstName: event.target.value});
    };

    onMiddleNameChange = event => {
        this.setState({middleName: event.target.value});
    };

    onLastNameChange = event => {
        this.setState({lastName: event.target.value});
    };

    onErrorMsgChange = (errorMsg) => {
        this.setState({errorMsg})
    };

    goToUserPage = () => {
        this.props.history.push("/user");
    };

    goToLogin = () => {
        this.props.history.push("/login");
    };

    checkMail = (mail) => {
        if (!mail.includes("@sysco.no")) {
            return mail + "@sysco.no"
        } else {
            return mail
        }
    };

    checkNameFormat = (name) => {


    };

    checkIfUserExists = async () => {
        const user = {
            email: this.checkMail(this.state.email)
        };
        const response = await axios.post('https://sysco-feri.herokuapp.com/api/login', user)
        return response !== null && response !== undefined
    };

    signUpNewUser = async () => {
        this.onErrorMsgChange(null);

        const exists = this.checkIfUserExists();
        if (exists === true) {
            this.setState({firstName: '', middleName: '', lastName: '', email: ''});
            this.onErrorMsgChange("This user already exists, please sign in on front page!");
        }

        const user = {
            firstName: this.checkNameFormat(this.state.firstName) + " " + this.checkNameFormat(this.state.middleName),
            lastName: this.checkNameFormat(this.state.lastName),
            email: this.checkMail(this.state.email)
        };

        const response = await axios.post('https://sysco-feri.herokuapp.com/api/user', user)
            .catch(error => {
                this.setState({firstName: '', middleName: '', lastName: '', email: ''});
                this.onErrorMsgChange("Something went wrong! ");
            });


        console.log(response);
        if (response !== null && response !== undefined) {
            if (response.status === 200) {
                this.props.setLoggedIn(response.data);
                if (this.props.loggedIn) {
                    this.goToUserPage();
                }
            } else {
                // to empty the input field
                this.setState({firstName: '', middleName: '', lastName: '', email: ''});
                this.onErrorMsgChange("Something went wrong!");
            }
        } else {
            this.setState({firstName: '', middleName: '', lastName: '', email: ''});
            this.onErrorMsgChange("Please try to sign up again.");
        }
    };




    render() {
        return (
            <div className='signUp'>
                <Button id="goBackButton" onClick={() => this.goToLogin()}>&larr;</Button>
                <div className='signUpContent'>
                    <React.Fragment>
                        <Form className='signUpFormGroups'>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Input type="text" name="firstName" placeholder="firstName*" id='signUpInput'
                                        value={this.state.firstName} onChange={e => this.onFirstNameChange(e)}/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Input type="text" name="middleName" placeholder="middleName" id='signUpInput'
                                               value={this.state.middleName} onChange={e => this.onMiddleNameChange(e)}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Input type="text" name="lastName" placeholder="lastName*" id='signUpInput'
                                        value={this.state.lastName} onChange={e => this.onLastNameChange(e)}/>
                                    </FormGroup>
                                </Col>
                                <Col/>
                            </Row>
                            <Row form>
                                <InputGroup size="lg">
                                    <Input name="name" placeholder="firstname.middlename.lastname*" id="signUpEmailInput"
                                           value={this.state.email} onChange={e => this.onEmailChange(e)}/>
                                    <InputGroupAddon addonType="append">
                                        <InputGroupText>@sysco.no</InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                            </Row>
                            <Row form>
                                <Label htmlFor="lastName" id="signUpDescription">*starred fields are mandatory</Label>
                            </Row>
                            <Button id="signUpPageButton"
                                    onClick={() => this.signUpNewUser()}>Create User</Button>
                        </Form>
                    </React.Fragment>
                </div>

            </div>


        );
    }
}
