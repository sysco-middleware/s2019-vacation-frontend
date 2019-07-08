import React from 'react';
import '../styling/general.css';
import '../styling/userpageStyling.css';
import { Card, CardBody, CardTitle } from 'reactstrap';

import {readableTime} from "../../utils/unixTranslate";

export default class UserBox extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        const {loggedIn, user} = this.props;

        if(loggedIn && user !== null) {
            return (
                <Card className='userBox' >
                    <CardTitle className='userBoxTitle'>User profile</CardTitle>
                    <CardBody className='userBoxBody'>
                        <p><strong>Name: </strong>{user.firstName+" "+user.lastName}</p>
                        <p><strong>Email: </strong>{user.email}</p>
                        <p><strong>Profile created: </strong>{readableTime(user.created, true)}</p>
                        <strong>Roles:</strong>
                        <ul style={{
                            listStyle: "none",
                        }}>
                        {user.roles !== undefined ? user.roles.map((role) => {
                            return <li ><pre>{role}</pre></li>
                        }) : "No Roles!"}
                        </ul>
                    </CardBody>
                </Card>
            );
        }else{
            return <div/>
        }
    }
}

