import React from 'react';
import './general.css';
import { Button, InputGroup, Input, InputGroupAddon, InputGroupText} from 'reactstrap';
import bilde from '../uploads/vaca.png';
import axios from 'axios';

export default class Login extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        exists: false,
        name: ''
      }
    }
  
    handleChange = event => {
      this.setState({name: event.target.value});
    }

    goToUser = () => {
      this.props.history.push("/user");
    }

    fetchUser = async() => {
      const user = {
        email: this.state.name + "@sysco.no"
      }
      const response = await axios.post('https://sysco-feri.herokuapp.com/api/login', user)
        
      console.log(response)
      if(response.status === 200)
      {
        console.log(response.data.firstName)
        this.goToUser();
      }
      else{
        alert("Can't find user with the email!");
      }
    }

    render(){
      return (
        <div className="login">
            <div className="contentLogin">
            <InputGroup id="inputGroup" size="lg">
              <Input placeholder="username" name="name" onChange={this.handleChange}/>
                <InputGroupAddon addonType="append">
                    <InputGroupText>@sysco.no</InputGroupText>
                  </InputGroupAddon>
            </InputGroup>
            <Button id="signIn" value="approved" onClick= {() => this.fetchUser()}>Sign in</Button>
            </div>
            <img src={bilde} alt="icon" id="icon"></img>
        </div>
      );
    }
  }

