import React from 'react';
import '../styling/general.css';
import '../styling/userpageStyling.css';
import { Table, Card, CardImg, CardText, CardBody, Row, Col,
    CardTitle, CardSubtitle, Button, Pagination, PaginationItem, PaginationLink, Spinner } from 'reactstrap';
import axios from "axios";
import { withRouter } from 'react-router';
import RequestModal from './RequestModal'
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
                <Card>
                    <CardTitle>User</CardTitle>
                    <CardBody>
                        <p><strong>NAME: </strong>{user.firstName+" "+user.lastName}</p>
                        <p><strong>EMAIL: </strong>{user.email}</p>
                        <p><strong>CREATED: </strong>{readableTime(user.created, true)}</p>
                    </CardBody>
                </Card>
            );
        }else{
            return <div/>
        }
    }
}

