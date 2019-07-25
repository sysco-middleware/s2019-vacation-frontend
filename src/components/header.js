import React from 'react';
import './styling/general.css';
import {Link} from 'react-router-dom'
import {Col, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Row} from 'reactstrap';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {loggedIn, user, setLoggedIn} = this.props;

        const loggedInMenuStyle = {
            fontSize: '20px',
            paddingTop: '10px',
            paddingBottom: '10px',
            paddingLeft: '50px',
            paddingRight: '50px',
            border: '3px solid white',
            margin: '3px',
            borderRadius: '10px',
            alignItems: 'right'
        };

        return (
            <Row style={{
                marginBottom: '10px',
            }}>
                <Col sm="12" md="12" lg="12">
                    <Navbar color="color" light expand="md">
                        <NavbarBrand href="/">
                            <img
                                src="https://haugesundil.no/wp-content/uploads/2017/04/Sysco_logo_RGB-1-e1467987962479.jpg"
                                id="syscoLogo" alt="sysco_Logo"/>
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            {loggedIn === true ? (
                                <Nav className="ml-auto" navbar>
                                    <NavItem style={loggedInMenuStyle}>
                                        <Link to={'/user'}>User</Link>
                                    </NavItem>
                                    <NavItem style={loggedInMenuStyle}>
                                        <Link to={'/admin'}>Admin</Link>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink style={loggedInMenuStyle} onClick={() => setLoggedIn(false)}
                                                 href={'/'}>Logout</NavLink>
                                    </NavItem>
                                </Nav>
                            ) : (
                                null
                            )}
                        </Collapse>
                    </Navbar>
                </Col>
            </Row>
        );
    }
}