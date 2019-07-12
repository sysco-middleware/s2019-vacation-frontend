import React from 'react';
import './styling/general.css';
import {Link} from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
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
                  {
                    (user !== null &&
                        loggedIn === true &&
                        user.roles !== undefined &&
                        user.roles.includes("ADMIN")) ? (
                        <Nav style={{marginBottom: '-10px'}} className="ml-auto" navbar>
                          <Link style={{fontSize: '20px'}} to={'/admin'}>Admin</Link>
                        </Nav>
                    ) : (
                        <div/>
                    )
                  }
                    {loggedIn === true ?
                        (
                            <Nav style={{marginBottom: '-10px'}} className="ml-auto" navbar>
                              <Link style={{fontSize: '20px'}} to={'/user'}>User</Link>
                              <Link style={{fontSize: '20px'}} onClick={()=>setLoggedIn(false)}  to={'/'}>Logout</Link>
                            </Nav>
                        ) :
                        (
                            <Nav style={{marginBottom: '-10px'}} className="ml-auto" navbar>
                              <Link style={{fontSize: '20px'}} to={'/'}>Login</Link>
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