import React from 'react';
import '../styling/general.css';
import '../styling/userpageStyling.css';
import axios from 'axios'
import _ from 'lodash'
import {readableTime} from "../../utils/unixTranslate";
import {randomString} from "../../utils/RandomString";
import {Card, CardBody, CardTitle, Badge, Table, UncontrolledCollapse, Spinner,} from 'reactstrap';



export default class AdminUserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }




    render() {
        const {loggedIn, user, users, showAllUsersSpinner, title} = this.props;
        const randString = randomString()[0];

        if (loggedIn && user !== null && user !== undefined && user.roles.includes("ADMIN") && users !== null) {
            return (
                <div>
                    <Card className="cardBox" >
                        <CardBody style={{
                            cursor: 'pointer',
                        }}
                                  id={randString}>
                            <CardTitle>{title}<Badge style={{ marginLeft: '5px' }} color="secondary">{_.size(users)}</Badge></CardTitle>
                        </CardBody>
                        <CardBody className="cardBody" style={{ marginTop: '-20px' }} >
                            <UncontrolledCollapse toggler={'#' + randString}>
                                <Table size="sm" hover responsive>
                                    <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>Name</th>
                                        <th>Title</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>GUID</th>
                                        <th>SuperiorGUID</th>
                                        <th>created</th>
                                    </tr>
                                    </thead>
                                    {showAllUsersSpinner === false ? (
                                    <tbody>
                                    {_.map(users, (user, i) => {
                                        return (
                                            <tr  key={i + 'klcwnoasdsa'}>
                                                <td>{user.userId !== undefined ? user.userId : "No Id!"}</td>
                                                <td>{user.firstName !== undefined && user.lastName !== undefined ? user.firstName+" "+user.lastName : "No Name!"}</td>
                                                <td>{user.title !== undefined ? user.title : "No Title!"}</td>
                                                <td>{user.email !== undefined ? user.email : "No Email!"}</td>
                                                <td>{user.phone !== undefined ? user.phone : "No Phone!"}</td>
                                                <td>{user.severaUserGUID !== undefined ? user.severaUserGUID : "No GUID"}</td>
                                                <td>{user.severaSuperiorGUID !== undefined ? user.severaSuperiorGUID : "No superiorGUID!"}</td>
                                                <td>{readableTime(user.created, true)}</td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                        ):(
                                            <tbody>
                                                <Spinner style={{ width: '3rem', height: '3rem' }} />{' '}
                                            </tbody>
                                    )}
                                </Table>
                            </UncontrolledCollapse>
                        </CardBody>
                    </Card>
                </div>

            );
        } else {
            this.handleNotLoggedIn();
            return <div/>
        }
    }
}