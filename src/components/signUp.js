import React from 'react';
import './general.css';
import {
    Button,
    Col,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    Row,
    UncontrolledAlert
} from "reactstrap";
import axios from 'axios';
import _ from "lodash"

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
        return /^[a-zA-Z]*$/.test(name)
    };

    formatName = (name) => {
        return _.upperFirst(_.lowerCase(name))
    };

    checkIfUserExists = async () => {
        const user = {
            email: this.checkMail(this.state.email)
        };
        const response = await axios.post('https://sysco-feri.herokuapp.com/api/login', user)
            .catch(error => {
                this.setState({firstName: '', middleName: '', lastName: '', email: ''});
                this.onErrorMsgChange("Something went wrong! ");
            });
        return response !== null && response !== undefined
    };

    signUpNewUser = async () => {
        this.onErrorMsgChange(null);
        const {firstName, middleName, lastName, email} = this.state;
        if(firstName.length > 0 && lastName.length > 0 && email.length > 0  ) {

            const exists = this.checkIfUserExists();
            if (exists === true) {
                this.setState({firstName: '', middleName: '', lastName: '', email: ''});
                this.onErrorMsgChange("Something went wrong!");
            }

            const user = {
                firstName: this.formatName(this.state.firstName) + " " + this.formatName(this.state.middleName),
                lastName: this.formatName(this.state.lastName),
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
        }else{
            this.onErrorMsgChange("Fields cannot be empty!")
        }
    };


    renderErrorMsg = () => {
        if (this.state.errorMsg !== null && this.state.errorMsg.length > 0) {
            return (<UncontrolledAlert color="primary">
                {this.state.errorMsg}
            </UncontrolledAlert>);
        } else {
            return <div/>
        }
    };

    render() {
        return (
            <div className='signUp'>
                {this.renderErrorMsg()}
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
