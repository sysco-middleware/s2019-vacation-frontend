import React from 'react';
import '../styling/modalLeader.css';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';

export default class ModalLeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        user: [],
        leaderId: null
    };

    }

    async componentDidMount(){
        await this.fetchLeaders()
    }

    fetchLeaders = async () => {
        const response = await axios.get('https://sysco-feri.herokuapp.com/api/user')
            .catch(error => {
            });
        if (response !== null && response !== undefined) {
            if (response.status === 200) {
                await this.setState({user: response.data})
            } 
        } 
    };

    replaceLeader = async (userId, leaderId) => {
        const response = await axios.get('https://sysco-feri.herokuapp.com/api/user/'+ userId + '/replace-supervisor/' + leaderId)
            .catch(error => {
                alert('something went wrong!')
            });
    };

    setLeader = async (userId, leaderId) => {
        const response = await axios.get('https://sysco-feri.herokuapp.com/api/user/'+ userId + '/add-supervisor/' + leaderId)
            .catch(error => {
                alert('something went wrong!')
            });
       
    };

    changeLeader = async () => {
        const {user, toggle} = this.props;
        if(this.state.leaderId !== null){
            console.log(this.state.leaderId)
            if(user.superiorId === null)
            {
                await this.setLeader(user.userId, this.state.leaderId)
            }
            else{
                await this.replaceLeader(user.userId, this.state.leaderId)
            }
        }
        toggle()

    }

    setSelect = (e) =>{
        this.setState({leaderId: this.state.user[e.target.value].userId})
    }

    render() {
        return (
          <div>
            <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} backdrop={this.state.backdrop}>
              <ModalHeader toggle={this.props.toggle}>Leader</ModalHeader>
              <ModalBody>
                <Form inline onSubmit={(e) => e.preventDefault()}>
                <FormGroup>
                    <Label for="backdrop"></Label>{' '}
                    <Input type="select" name="backdrop" id="backdrop" onChange={(e) =>this.setSelect(e)}>
                        {this.state.user.map((user,i)=>{
                            return <option value={i}>{user.firstName + ' ' + user.lastName}</option>
                        })}
                    </Input>
                </FormGroup>
                {' '}
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button id="button" color="secondary" onClick={this.props.toggle}>Cancel</Button>{' '}
                <Button id="button" color="primary" onClick={() => this.changeLeader()}>Submit</Button>
              </ModalFooter>
            </Modal>
          </div>
        );
      }
    }