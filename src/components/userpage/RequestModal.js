import React from 'react';
import { readableTime } from '../../utils/unixTranslate';
import {     Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from 'reactstrap';


const RequestModal = (props) => {
    let { request, toggleMod, modal} = props;
    return (
        <Modal isOpen={modal} transparent={true} toggle={toggleMod} className={props.className}>
            <ModalHeader className='modalHeader' style={{backgroundColor: '#CBE5FE'}} toggle={toggleMod}>Details</ModalHeader>
            <ModalBody>
                <p><strong>Request number: </strong>{request.requestId}</p>
                <p><strong>From: </strong>{request.fromDate[0] + "-" + request.fromDate[1] + "-" + request.fromDate[2]}</p>
                <p><strong>To: </strong><a>{request.toDate[0] + "-" + request.toDate[1] + "-" + request.toDate[2]}</a></p>
                <p><strong>Status: </strong>{request.status}</p>
                <p><strong>Comment: </strong>{request.comment !== null ? request.comment : "No comment!"}</p>
                <p><strong>Created: </strong>{readableTime(request.created, true)}</p>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggleMod}>Close</Button>
            </ModalFooter>
        </Modal>
    );
};

export default RequestModal;