import React from 'react';
import './general.css';
import Requests from './requests.js';
import VacationForm from './vacationForm.js'; 
import {Row, Col, UncontrolledAlert} from 'reactstrap';


export default class userPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        errorMsg: null,
        infoMsg: null
    }
  }

    handleNotLoggedIn = () => {
        this.props.history.push("/error");
    };

    onErrorMsgChange = (errorMsg) => {
        this.setState({errorMsg})
    };

    onInfoMsgChange = (infoMsg) => {
        this.setState({infoMsg})
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

    renderInfoMsg = () => {
        if(this.state.errorMsg !== null && this.state.errorMsg.length > 0){
            return (<UncontrolledAlert color="info">
                {this.state.infoMsg}
            </UncontrolledAlert>);
        }else{
            return <div/>
        }
    };

  render(){
      const {loggedIn, user} = this.props;

    if(loggedIn || user !== null || user !== undefined) {
        return (
            <div>
                {this.renderErrorMsg()}
                {this.renderInfoMsg()}
                <div className="userPage">
                    <div>
                        <Row>
                            <Col md={8}>
                                <VacationForm user={user} loggedIn={loggedIn} onErrorMsgChange={this.onErrorMsgChange}
                                              onInfoMsgChange={this.onInfoMsgChange}/>
                            </Col>
                            <Col md={4}>
                                <Requests user={user} loggedIn={loggedIn} onErrorMsgChange={this.onErrorMsgChange}
                                          onInfoMsgChange={this.onInfoMsgChange}/>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }else{
        this.handleNotLoggedIn();
        return <div/>
    }
  }
}