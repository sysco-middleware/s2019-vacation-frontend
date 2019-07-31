import React from 'react';
import '../styling/adminPageStyling.css';
import _ from 'lodash'
import {randomString} from "../../utils/RandomString";
import AdminUserListItem from "./AdminUserListItem"
import {Badge, Card, CardBody, CardTitle, Spinner, Table, UncontrolledCollapse,} from 'reactstrap';


export default class AdminUserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        const {loggedIn, user, users, showAllUsersSpinner, title, isLocalUsers} = this.props;
        const randString = randomString()[0];

        if (loggedIn && user !== null && user !== undefined && user.roles.includes("ADMIN") && users !== null) {
            return (
                <div>
                    <Card className="adminPageCardBox">
                        <CardBody style={{
                            cursor: 'pointer',
                        }}
                                  id={randString}>
                            <CardTitle>{title}<Badge style={{marginLeft: '5px'}}
                                                     color="secondary">{_.size(users)}</Badge></CardTitle>
                        </CardBody>
                        <CardBody className="adminPageCardBody" style={{marginTop: '-20px'}}>
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
                                        <th>Enabled</th>
                                        <th>created</th>
                                        <th>Leave Days</th>
                                    </tr>
                                    </thead>
                                    {showAllUsersSpinner === false ? (
                                        <tbody>
                                        {_.map(users, (user, i) => {
                                            return <AdminUserListItem isLocalUsers={isLocalUsers}
                                                                      fetchAllUsers={this.props.fetchAllUsers}
                                                                      user={user} index={i}/>
                                        })}
                                        </tbody>
                                    ) : (
                                        <tbody>
                                            <Spinner style={{width: '3rem', height: '3rem'}}/>
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