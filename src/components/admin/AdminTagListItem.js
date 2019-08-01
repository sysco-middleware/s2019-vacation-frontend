import React from 'react';
import '../styling/adminPageStyling.css';
import axios from 'axios'
import {readableTime} from "../../utils/unixTranslate";
import {Badge, Input} from 'reactstrap';
import { FaTimes } from 'react-icons/fa';

export default class AdminUserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    deleteTag = async () => {
        const {tag, fetchAllTags} = this.props;
        if(tag !== null) {
            const response = await axios.delete('https://sysco-feri.herokuapp.com/api/tag/' + tag.tagId)
                .catch(error => {
                    alert('something went wrong!')
                });
            fetchAllTags()
        }
    };

    render() {
        const {tag, index, fetchAllTags, user} = this.props;
        const lockStyle = {
            cursor: "pointer"
        };

        if (user !== null && user !== undefined) {
            return (
                <tr key={index + 'klcwnoasdsa'}>
                    <td>{tag.tagId !== undefined ? tag.tagId : "No Id!"}</td>
                    <td>{tag.tag !== undefined ? tag.tag : "No Tag!"}</td>
                    <td>{tag.created !== undefined ? readableTime(tag.created, true) : "No data"}</td>
                    <td><FaTimes style={lockStyle} onClick={()=>this.deleteTag()}/></td>
                </tr>
            );
        } else {
            return <div/>
        }
    }
}