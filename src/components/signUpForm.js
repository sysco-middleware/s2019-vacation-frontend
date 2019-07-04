import React from 'react';
import './general.css';
import {Button, InputGroup, Input, InputGroupAddon, InputGroupText, Form, Row, Col, FormGroup, Label} from 'reactstrap';

export default class SignUpForm extends React.Component {
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
            <React.Fragment>
                <Form className="createUser">
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="firstName">First name</Label>
                                <Input type="text" name="firstName" id="name" placeholder="firstName"/>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="middleName">Middle Name</Label>
                                <Input type="text" name="middleName" id="name" placeholder="middleName"/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input type="text" name="lastName" id="name" placeholder="lastName"/>
                            </FormGroup>
                        </Col>
                        <Col/>
                    </Row>
                    <Row form>
                        <InputGroup id="inputGroup" size="lg">
                            <Input name="name"/>
                            <InputGroupAddon addonType="append">
                                <InputGroupText>@sysco.no</InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </Row>

                    <Button id="knapp">Create User</Button>
                </Form>
            </React.Fragment>
        );
    }
}

