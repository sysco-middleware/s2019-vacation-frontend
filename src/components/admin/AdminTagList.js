import React from 'react';
import '../styling/adminPageStyling.css';
import _ from 'lodash'
import {randomString} from "../../utils/RandomString";
import AdminTagListItem from "./AdminTagListItem"
import {
    Badge,
    Card,
    CardBody,
    CardTitle, Form,
    FormGroup,
    Input,
    Label,
    Spinner,
    Table,
    UncontrolledCollapse,
} from 'reactstrap';
import axios from "axios";


export default class AdminTagList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tag: null
        }
    }

    addTag = async () => {
        const {fetchAllTags} = this.props;
        const {tag} = this.state;
        if(tag !== null) {
            const payload = {
                tag: this.state.tag.toUpperCase()
            };
            const response = await axios.post('https://sysco-feri.herokuapp.com/api/tag', payload)
                .catch(error => {
                    alert('something went wrong!')
                });
            fetchAllTags()
        }
    };

    onTagChange = async (e) => {
        await this.setState({tag: e.target.value});
    };


    render() {
        const {tags, user, showAllTagsSpinner, title} = this.props;
        const randString = randomString()[0];

        if (user !== null && user !== undefined && user.roles.includes("ADMIN") && tags !== null) {
            return (
                <div>
                    <Card className="adminPageCardBox">
                        <CardBody style={{
                            cursor: 'pointer',
                        }}
                                  id={randString}>
                            <CardTitle>{title}<Badge style={{marginLeft: '5px'}}
                                                     color="secondary">{_.size(tags)}</Badge></CardTitle>
                        </CardBody>
                        <CardBody className="adminPageCardBody" style={{marginTop: '-20px'}}>
                            <UncontrolledCollapse toggler={'#' + randString}>

                                <FormGroup>
                                    <Label htmlFor="tag">New tag: </Label>
                                    <Input name="tag" id="tag" value={this.state.tag}
                                           onChange={(e) => this.onTagChange(e)}/>
                                    <Badge style={{
                                        cursor: 'pointer',
                                    }} color="info" onClick={()=>this.addTag()}>Add</Badge>

                                </FormGroup>
                                <Table size="sm" hover responsive>
                                    <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>Tag</th>
                                        <th>Created</th>
                                    </tr>
                                    </thead>
                                    {showAllTagsSpinner === false ? (
                                        <tbody>
                                        {_.map(tags, (tag, i) => {
                                            return <AdminTagListItem fetchAllTags={this.props.fetchAllTags}
                                                                      user={user}
                                                                      tag={tag} index={i}/>
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