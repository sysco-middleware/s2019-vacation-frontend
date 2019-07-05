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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';


export default class Header extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render(){
    return (
        <div style={{marginBottom: '20px'}}>
          <Navbar color="color" light expand="md" >
            <NavbarBrand href="/">
              <img src="https://haugesundil.no/wp-content/uploads/2017/04/Sysco_logo_RGB-1-e1467987962479.jpg" id="syscoLogo" alt="sysco_Logo"/>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="https://secure.severa.com/vismasevera/" >Visma Severa</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://sysco.no/" >Sysco Homepage</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
    );
  }
}