import React from 'react';
import { readableTime } from '../../utils/unixTranslate';
import {     Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Card,
    CardBody,
    CardTitle,
    UncontrolledCollapse,
} from 'reactstrap';


const RequestModal = (props) => {
    const { request, toggleMod, modal} = props;
    return (
        <Modal isOpen={modal} toggle={toggleMod} className={props.className}>
            <ModalHeader style={{backgroundColor: '#738fa2'}} toggle={toggleMod}>REQUEST</ModalHeader>
            <ModalBody>
                <div style={{display: 'inline-block', width: '100%'}}>
                    <p className="lead" style={{float:'left', margin: '10px 0'}}>{request.requestId}</p>
                </div>
                <hr className="my-2" />
                <p><strong>FROM: </strong>{request.fromDate[0] + "-" + request.fromDate[1] + "-" + request.fromDate[2]}</p>
                <p><strong>TO: </strong><a>{request.toDate[0] + "-" + request.toDate[1] + "-" + request.toDate[2]}</a></p>
                <p><strong>STATUS: </strong>{request.status}</p>
                <p><strong>COMMENT: </strong>{request.comment !== null ? request.comment : "No comment!"}</p>
                <p><strong>CREATED: </strong>{readableTime(request.created, true)}</p>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggleMod}>Close</Button>
            </ModalFooter>
        </Modal>
    );
}

export default RequestModal;