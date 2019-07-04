import React from 'react';
import './general.css';
import {Button, Col, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Row} from "reactstrap";


export default class signUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exists: false,
            firstName: '',
            lastName: '',
            email: ''
        }
    }

    render() {
        return (
            <div className='signUp'>
                <div className='signUpContent'>
                    <React.Fragment>
                        <Form className='signUpFormGroups'>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Input type="text" name="firstName" placeholder="firstName*" id='signUpInput'/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Input type="text" name="middleName"  placeholder="middleName" id='signUpInput'/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Input type="text" name="lastName" placeholder="lastName*" id='signUpInput'/>
                                    </FormGroup>
                                </Col>
                                <Col/>
                            </Row>
                            <Row form>
                                <InputGroup size="lg">
                                    <Input name="name" placeholder="firstname.middlename.lastname*" id="signUpEmailInput"/>
                                    <InputGroupAddon addonType="append">
                                        <InputGroupText>@sysco.no</InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                            </Row>
                            <Row form>
                                <Label htmlFor="lastName" id="signUpDescription">*starred fields are mandetory</Label>
                            </Row>
                            <Button id="signUpPageButton">Create User</Button>
                        </Form>
                    </React.Fragment>
                </div>

            </div>


        );
    }
}
