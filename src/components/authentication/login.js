import React from 'react';
import '../styling/general.css';
import '../styling/loginStyling.css';
import {
    Button,
    InputGroup,
    Input,
    InputGroupAddon,
    InputGroupText,
    UncontrolledAlert,
    Form,
    Row,
    Col, FormGroup, Spinner
} from 'reactstrap';
import image from '../../uploads/vaca.png';
import axios from 'axios';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exists: false,
            email: '',
            errorMsg: null,
            showSpinner: false,
        }
    }

    setShowSpinner = (showSpinner) => {
        this.setState({showSpinner})
    };

    onEmailChange = event => {
        this.setState({email: event.target.value});
    };

    goToUserPage = () => {
        this.props.history.push("/user");
    };

    onErrorMsgChange = (errorMsg) => {
        this.setState({errorMsg})
    };

    goToSignUpPage = () => {
        this.props.history.push("/signUp");
    };


    fetchUser = async () => {
        this.setShowSpinner(true);
        this.onErrorMsgChange(null);

        const user = {
            email: this.checkMail(this.state.email)
        };
        const response = await axios.post('https://sysco-feri.herokuapp.com/api/login', user)
            .catch(error => {
                this.setState({email: ""});
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
                this.setState({email: ""});
                this.onErrorMsgChange("Something went wrong!");
            }
        } else {
            this.setState({email: ""});
            this.onErrorMsgChange("Please type in your username again or click 'Sign up'");
        }
        this.setShowSpinner(false);
    };

    checkMail = (mail) => {
        if (!mail.includes("@sysco.no")) {
            return mail + "@sysco.no"
        } else {
            return mail
        }
    };

    renderErrorMsg = () => {
        if (this.state.errorMsg !== null && this.state.errorMsg.length > 0) {
            return (<UncontrolledAlert color="warning">
                {this.state.errorMsg}
            </UncontrolledAlert>);
        } else {
            return <div/>
        }
    };

    render() {
        return (
            <div>
                {this.renderErrorMsg()}
                <div className="login">
                    <div className="loginContent">
                        <InputGroup id="loginInputGroup" size="lg">
                            <Input placeholder="username" name="name" value={this.state.email}
                                   onChange={e => this.onEmailChange(e)}/>
                            <InputGroupAddon addonType="append">
                                <InputGroupText>@sysco.no</InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                        { this.state.showSpinner === false ? (
                            <React.Fragment>
                                <Form className="buttons">
                                    <Row form>
                                        <Col sm={3}/>
                                        <Col sm={3}>
                                            <FormGroup>
                                                <Button id="loginPageButtons" value="approved"
                                                        onClick={() => this.fetchUser()}>Sign in</Button>
                                            </FormGroup>
                                        </Col>
                                        <Col sm={3}>
                                            <FormGroup>
                                                <Button disabled id="loginPageButtons" value="approved"
                                                        onClick={() => this.goToSignUpPage()}>Create user</Button>
                                            </FormGroup>
                                        </Col>
                                        <Col sm={3}/>
                                    </Row>
                                </Form>
                            </React.Fragment>
                        ) : (
                            <Spinner style={{ width: '3rem', height: '3rem' }} />
                        )
                        }
                    </div>
                    <img src={image} alt="icon" id="icon"/>
                </div>
            </div>
        );
    }
}

