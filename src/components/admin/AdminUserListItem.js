import React from 'react';
import '../styling/adminPageStyling.css';
import axios from 'axios'
import {readableTime} from "../../utils/unixTranslate";
import {Badge, Input} from 'reactstrap';
import { FaLock, FaLockOpen } from 'react-icons/fa';

export default class AdminUserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vacationDays: null,
        }
    }

    onVacationDaysChange = async (e) => {
        await this.setState({vacationDays: e.target.value})
    };


    changeVacationDays = async () => {
        const {user} = this.props;
        if (this.state.vacationDays !== null) {
            const response = await axios.get(`https://sysco-feri.herokuapp.com/api/user/${user.userId}/vacationDays/${this.state.vacationDays}`)
                .catch(error => {
                });

            console.log(response);
            if (response !== null && response !== undefined) {
                if (response.status === 200) {
                } else {
                    alert("Something went wrong!")
                }
            }
            await this.props.fetchAllUsers();
        }
    };

    onLockClick = async () => {
        const {user} = this.props;
        const response = await axios.get(`https://sysco-feri.herokuapp.com/api/user/${user.userId}/enable`)
            .catch(error => {
            });

        console.log(response);
        if (response !== null && response !== undefined) {
            if (response.status === 200) {
            } else {
                alert("Something went wrong!")
            }
        }
        await this.props.fetchAllUsers();
    };

    onLockOpenClick = async () => {
        const {user} = this.props;
        const response = await axios.get(`https://sysco-feri.herokuapp.com/api/user/${user.userId}/disable`)
            .catch(error => {
            });

        console.log(response);
        if (response !== null && response !== undefined) {
            if (response.status === 200) {
            } else {
                alert("Something went wrong!")
            }
        }
        await this.props.fetchAllUsers();
    };


    render() {
        const {user, index, isLocalUsers} = this.props;
        const lockStyle = {
            cursor: "pointer"
        };

        if (user !== null && user !== undefined) {
            return (
                <tr key={index + 'klcwnoasdsa'}>
                    <td>{user.userId !== undefined ? user.userId : "No Id!"}</td>
                    <td>{user.firstName !== undefined && user.lastName !== undefined ? user.firstName + " " + user.lastName : "No Name!"}</td>
                    <td>{user.title !== undefined ? user.title : "No Title!"}</td>
                    <td>{user.email !== undefined ? user.email : "No Email!"}</td>
                    <td>{user.phone !== undefined ? user.phone : "No Phone!"}</td>
                    <td>{user.severaUserGUID !== undefined ? user.severaUserGUID : "No GUID"}</td>
                    <td>{user.severaSuperiorGUID !== undefined ? user.severaSuperiorGUID : "No superiorGUID!"}</td>
                    <td>{isLocalUsers?(user.enabled !== undefined ? (user.enabled ? <FaLockOpen onClick={this.onLockOpenClick} style={lockStyle}/> : <FaLock onClick={this.onLockClick} style={lockStyle}/>) : "No Data"):"-"}</td>
                    <td>{isLocalUsers ? readableTime(user.created, true) : "-"}</td>
                    <td>
                        {isLocalUsers ? (
                            <Input placeholder={user.totalDays + "/" + user.vacationDays}
                                                value={this.state.vacationDays}
                                                onChange={(e) => this.onVacationDaysChange(e)} min={user.totalDays}
                                                max={1000} type="number" step="1"/>
                                                ) : "-"}
                        {isLocalUsers && this.state.vacationDays !== null ? (
                            <div>
                                <Badge onClick={() => this.changeVacationDays()}
                                       style={{marginLeft: '5px', cursor: "pointer"}} color="info">Update</Badge>
                                <Badge onClick={() => {
                                    this.setState({vacationDays: null})
                                }} style={{marginLeft: '5px', cursor: "pointer"}} color="danger">X</Badge>
                            </div>
                        ) : null}
                    </td>
                </tr>
            );
        } else {
            return <div/>
        }
    }
}