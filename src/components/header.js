import React from 'react';
import './styling/general.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
    Row,
    Col
  } from 'reactstrap';


export default class Header extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render(){
    const {loggedIn, user, setLoggedIn} = this.props;

    return (
        <Row style={{
          marginBottom: '10px',
        }}>
          <Col sm="12" md="12" lg="12">
              <Navbar color="color" light expand="md" >
                <NavbarBrand href="/">
                  <img src="https://haugesundil.no/wp-content/uploads/2017/04/Sysco_logo_RGB-1-e1467987962479.jpg" id="syscoLogo" alt="sysco_Logo"/>
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    {loggedIn === true ?
                        (
                            <Nav style={{marginBottom: '-10px'}} className="ml-auto" navbar>
                              <NavLink style={{fontSize: '20px'}} onClick={()=>setLoggedIn(false)} href='/'>Logout</NavLink>
                            </Nav>
                        ) :
                        (
                            <Nav style={{marginBottom: '-10px'}} className="ml-auto" navbar>
                              <NavLink style={{fontSize: '20px'}} href='/'>Login</NavLink>
                            </Nav>
                        )
                    }
                </Collapse>
              </Navbar>
          </Col>
        </Row>
    );
  }
}