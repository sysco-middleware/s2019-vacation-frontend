import React from 'react';
import '../styling/modalLeader.css';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';

export default class ModalLeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        tags: [],
        tag: null,
    };

    }

    async componentDidMount(){
        await this.fetchTags()
    }

    fetchTags = async () => {
        const response = await axios.get('https://sysco-feri.herokuapp.com/api/user/tags')
            .catch(error => {
            });
        if (response !== null && response !== undefined) {
            if (response.status === 200) {
                await this.setState({tags: response.data})
            } 
        } 
    };

    deleteTag = async () => {
        const {toggle, user} = this.props;
        if(this.state.tag !== null){

            // const payload = {
            //     tag: this.state.tag
            // }
            const response = await axios.delete('https://sysco-feri.herokuapp.com/api/user/'+ user.userId + '/tags/' + this.state.tag)
            .catch(error => {
                alert('something went wrong!')
            });
            toggle()
        };
    };

    setTag = async () => {
        const {toggle, user} = this.props;
        if(this.state.tag !== null){
        const payload = {
            tag: this.state.tag
        }
        const response = await axios.post('https://sysco-feri.herokuapp.com/api/user/'+ user.userId + '/tags', payload)
            .catch(error => {
                alert('something went wrong!')
            });
        toggle()
    };
};

    // changeTag = async () => {
    //     const {toggle, user} = this.props;
    //     if(tags[this.state.tag] !== null)
    //     {
    //         await this.deleteTag(tag, this.state.leaderId)
    //     }
    //     else{
    //         await this.setTag(tag.tagId, this.state.leaderId)
    //     }
    //     toggle()
    // }

    setSelect = (e) =>{
        this.setState({tag: this.state.tags[e.target.value]})
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
                        {this.state.tags.map((tag,i)=>{
                            return <option value={i}>{tag}</option>
                        })}
                    </Input>
                </FormGroup>
                {' '}
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button disabled={this.state.tag === null} id="button" color="danger" onClick={ () => this.deleteTag()}>Delete</Button>{' '}
                <Button disabled={this.state.tag === null} id="button" color="primary" onClick={() => this.setTag()}>Add tag</Button>
              </ModalFooter>
            </Modal>
          </div>
        );
      }
    }