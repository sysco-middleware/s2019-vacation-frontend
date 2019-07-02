import React from 'react';
import './general.css';
import { Button} from 'reactstrap';

export default class Login extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        approved: false
      }
    }
  
    render(){
      return (
        <div className="login">
            <div class="contentLogin">
            <label for="loginEmail" >LOGIN</label>
                <input type="email" id="loginEmail" required={true} placeholder="Write your sysco email here!"></input>           
            <Button id="signIn" value="approved" onChange= {(e) => this.setState({approved: !this.state.approved})}>Sign in</Button>
            </div>
        
        </div>
      );
    }
  }

// import React, { Component } from "react";
// import { Label } from "reactstrap";
// import { Button, FormGroup, FormControl} from "react-bootstrap";
// import "./general.css";

// export default class Login extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       email: "",
//       password: ""
//     };
//   }

//   validateForm() {
//     return this.state.email.length > 0 && this.state.password.length > 0;
//   }

//   handleChange = event => {
//     this.setState({
//       [event.target.id]: event.target.value
//     });
//   }

//   handleSubmit = event => {
//     event.preventDefault();
//   }

//   render() {
//     return (
//       <div className="Login">
//         <form onSubmit={this.handleSubmit}>
//           <FormGroup controlId="email" bsSize="large">
//             <Label>Email</Label>
//             <FormControl
//               autoFocus
//               type="email"
//               value={this.state.email}
//               onChange={this.handleChange}
//             />
//           </FormGroup>
//           <FormGroup controlId="password" bsSize="large">
//             <Label>Password</Label>
//             <FormControl
//               value={this.state.password}
//               onChange={this.handleChange}
//               type="password"
//             />
//           </FormGroup>
//           <Button
//             block
//             bsSize="large"
//             disabled={!this.validateForm()}
//             type="submit"
//           >
//             Login
//           </Button>
//         </form>
//       </div>
//     );
//   }
// }