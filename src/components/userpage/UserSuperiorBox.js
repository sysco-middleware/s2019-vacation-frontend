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
        const {loggedIn, user, setShowSuperiorBoxSpinner, showSuperiorBoxSpinner} = this.props;

        if(loggedIn && user !== null) {
            return (
                <Card className='cardBox' >
                    <CardTitle className='cardTitle'>Superior</CardTitle>
                    {showSuperiorBoxSpinner === false ? (
                        <CardBody className='cardBody'>
                            <p><strong>Name: </strong>{user.firstName + " " + user.lastName}</p>
                            <p><strong>Email: </strong>{user.email}</p>
                            <p><strong>Title: </strong>{user.title}</p>
                            <p><strong>GUID: </strong>{user.severaUserGUID}</p>
                            <p><strong>SuperiorGUID: </strong>{user.severaSuperiorGUID}</p>
                            <p><strong>Phone: </strong>{user.phone}</p>
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

