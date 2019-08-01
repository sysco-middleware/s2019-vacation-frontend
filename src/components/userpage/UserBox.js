import React from 'react';
import '../styling/general.css';
import '../styling/userpageStyling.css';
import axios from 'axios';
import {Card, CardBody, CardTitle, Spinner, Button, Badge} from 'reactstrap';
import ModalLeader from './leader_modal.js';
import ModalTags from './tag_modal.js';
import {readableTime} from "../../utils/unixTranslate";


export default class UserBox extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modal: false,
            leader: null,
            modalTag: false,
        }
    }

    async componentDidMount() {
        await this.fetchLeaders();
        await this.fetchTags()
    }

    toggleMod = () => {
        this.setState({
            modal: !this.state.modal,
        });
    };

    toggleTag = () => {
        this.setState({
            modalTag: !this.state.modalTag,
        });
    };

    fetchLeaders = async () => {
        const {user} = this.props;
        console.log(user.superiorId);
        if(user !== null && user !== undefined && user.superiorId !== null){
            const response = await axios.get('https://sysco-feri.herokuapp.com/api/user/' + user.superiorId)
                .catch(error => {
                    console.log("error")
                });
            if (response !== null && response !== undefined) {
                if (response.status === 200) {
                    await this.setState({leader: response.data})
                } 
            } 
            await this.props.setLoggedIn(user.email)
        }
    };

    fetchTags = async () => {
        const {user} = this.props;
        console.log(user.superiorId)
        if(user !== null && user !== undefined && user.superiorId !== null){
            const response = await axios.get('https://sysco-feri.herokuapp.com/api/user/' + user.superiorId)
                .catch(error => {
                    console.log("error")
                });
            if (response !== null && response !== undefined) {
                if (response.status === 200) {
                    await this.setState({leader: response.data})
                } 
            } 
            this.props.setLoggedIn(user.email)
        }
    };

    render(){
        const {user, showUserBoxSpinner} = this.props;
        const {leader} = this.state;

        if(user) {
            return (
                <Card className='cardBox' >
                    <CardTitle className='cardTitle'>User profile</CardTitle>
                    {showUserBoxSpinner === false ? (
                        <CardBody className='cardBody'>
                            <p><strong>Name: </strong>{user.firstName + " " + user.lastName}</p>
                            <p><strong>Email: </strong>{user.email}</p>
                            <p><strong>Profile created: </strong>{readableTime(user.created, true)}</p>
                            <p><strong>Title: </strong>{user.title}</p>
                            <p><strong>GUID: </strong>{user.severaUserGUID}</p>
                            <p><strong>SuperiorGUID: </strong>{user.severaSuperiorGUID}></p>
                            <p><strong>Leader:</strong>{leader !== null ? leader.firstName+' '+leader.lastName : "No leader"}<Badge color="info" style={{cursor:"pointer"}} onClick={()=> this.toggleMod()}>Change leader</Badge></p>
                            <p><strong>Phone: </strong>{user.phone}</p>
                            <strong>Tags:</strong>
                            <Badge color="info" style={{cursor:"pointer"}} onClick={()=> this.toggleTag()}>Add/delete tag</Badge>
                            <ul style={{
                                listStyle: "none",
                            }}>
                                {user.tags !== undefined ? user.tags.map((t) => {
                                    return <li >
                                        <pre>{t.tag}</pre>
                                    </li>
                                }) : "No tags!"}
                            </ul>
                            <strong>Roles:</strong>
                            <ul style={{
                                listStyle: "none",
                            }}>
                                {user.roles !== undefined ? user.roles.map((role) => {
                                    return <li >
                                        <pre>{role}</pre>
                                    </li>
                                }) : "No Roles!"}
                            </ul>
                            <p><strong>Estimated days left: </strong>{(user.vacationDays - user.totalDays) >= 0 ? (user.vacationDays - user.totalDays) : "No days left - ask your boss for more"}</p>
                        <ModalLeader modal={this.state.modal} toggle={this.toggleMod} user={user}/>
                        <ModalTags modal={this.state.modalTag} toggle={this.toggleTag} user={user}/>
                        </CardBody>
                    ) : (
                        <CardBody className='cardBody'>
                            <Spinner style={{ width: '3rem', height: '3rem' }} />
                        </CardBody>
                    )
                    }
                </Card>
            );
        } else {
            return null
        }
    }
}

