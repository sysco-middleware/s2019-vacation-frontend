import React from 'react';
import './general.css';
import { Button, InputGroup, Input, InputGroupAddon, InputGroupText} from 'reactstrap';
import bilde from '../uploads/vaca.png';
//import axios from 'axios';

export default class Login extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        exists: false
      }
    }
  
    goToUser = () => {
      this.props.history.push("/user");
    }

    fetchUser = () => {
      // axios.post('localhost:3000/api/login' {user})
      //   .then(response => {
      //     console.log(res);
      //     console.log(response.data);
      //   })
        
      var payload = 400;
      if(payload !== 401)
      {
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
              <Input placeholder="username" />
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

