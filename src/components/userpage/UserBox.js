import React from 'react';
import '../styling/general.css';
import '../styling/userpageStyling.css';
import { Card, CardBody, CardTitle, Spinner } from 'reactstrap';

import {readableTime} from "../../utils/unixTranslate";

export default class UserBox extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        const {loggedIn, user, setShowUserBoxSpinner, showUserBoxSpinner} = this.props;

        if(loggedIn && user !== null) {
            return (
                <Card className='cardBox' >
                    <CardTitle className='cardTitle'>User profile</CardTitle>
                    {showUserBoxSpinner === false ? (
                        <CardBody className='cardBody'>
                            <p><strong>Name: </strong>{user.firstName + " " + user.lastName}</p>
                            <p><strong>Email: </strong>{user.email}</p>
                            <p><strong>Profile created: </strong>{readableTime(user.created, true)}</p>
                            <strong>Roles:</strong>
                            <ul style={{
                                listStyle: "none",
                            }}>
                                {user.roles !== undefined ? user.roles.map((role) => {
                                    return <li>
                                        <pre>{role}</pre>
                                    </li>
                                }) : "No Roles!"}
                            </ul>
                        </CardBody>
                    ) : (
                        <CardBody className='cardBody'>
                            <Spinner style={{ width: '3rem', height: '3rem' }} />
                        </CardBody>
                    )
                    }
                </Card>
            );
        }else{
            return <div/>
        }
    }
}

