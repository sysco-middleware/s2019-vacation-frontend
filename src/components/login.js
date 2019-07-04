import React from 'react';
import './general.css';
import { Button, InputGroup, Input, InputGroupAddon, InputGroupText, UncontrolledAlert} from 'reactstrap';
import image from '../uploads/vaca.png';
import axios from 'axios';

export default class Login extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        exists: false,
        email: "",
        errorMsg: null,
      }
    }
  
    onEmailChange = event => {
      this.setState({email: event.target.value});
    };

    goToUserPage = () => {
      this.props.history.push("/user");
    };

    onErrorMsgChange = (errorMsg) => {
        this.setState({errorMsg})
    };


    fetchUser = async() => {
        this.onErrorMsgChange(null);
      const user = {
        email: this.checkMail(this.state.email)
      };
      const response = await axios.post('https://sysco-feri.herokuapp.com/api/login', user)
          .catch(error => {
              this.setState({email: ""});
              this.onErrorMsgChange("something went wrong! ");
          });
        
      console.log(response);
      if(response !== null && response !== undefined) {
          if (response.status === 200) {
              this.props.setLoggedIn(response.data);
              if (this.props.loggedIn) {
                  this.goToUserPage();
              }
          } else {
              // to empty the input field
              this.setState({email: ""});
              this.onErrorMsgChange("something went wrong!");
          }
      }else{
          this.setState({email: ""});
          this.onErrorMsgChange("something went wrong!");
      }
    };

    checkMail = (mail) => {
        if(!mail.includes("@sysco.no")){
            return mail + "@sysco.no"
        }else{
            return mail
        }
    };

    renderErrorMsg = () => {
        if(this.state.errorMsg !== null && this.state.errorMsg.length > 0){
           return (<UncontrolledAlert color="primary">
                {this.state.errorMsg}
            </UncontrolledAlert>);
        }else{
            return <div/>
        }
    };

    render(){
      return (
          <div>
              {this.renderErrorMsg()}
                <div className="login">
                    <div className="contentLogin">
                    <InputGroup id="inputGroup" size="lg">
                      <Input placeholder="username" name="name" value={this.state.email} onChange={e => this.onEmailChange(e)}/>
                        <InputGroupAddon addonType="append">
                            <InputGroupText>@sysco.no</InputGroupText>
                          </InputGroupAddon>
                    </InputGroup>
                    <Button id="signIn" value="approved" onClick= {() => this.fetchUser()}>Sign in</Button>
                    </div>
                    <img src={image} alt="icon" id="icon"/>
                </div>
          </div>

      );
    }
  }

