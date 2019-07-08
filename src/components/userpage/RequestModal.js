import React from 'react';
import { readableTime } from '../../utils/unixTranslate';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Badge} from 'reactstrap';

const getStatusColor = (status) => {
    switch (status) {
        case "PENDING":
            return "warning";
        case "APPROVED":
            return "success";
        case "DENIED":
            return "danger";
        default:
            return "info"
    }
};

const RequestModal = (props) => {
    const { request, toggleMod, modal} = props;
    if(request !== null) {
        return (
            <Modal isOpen={modal} transparent={true} toggle={toggleMod} className={props.className}>
                <ModalHeader className='modalHeader' style={{backgroundColor: '#CBE5FE'}}
                             toggle={toggleMod}>Details</ModalHeader>
                <ModalBody>
                    <p><strong>Request number: </strong>{request.requestId !== null ? request.requestId : "No ID!"}</p>
                    <p><strong>From: </strong>{request.fromDate !== undefined ? (request.fromDate[2] + "-" + request.fromDate[1] + "-" + request.fromDate[0]) : "No Date!"}</p>
                    <p><strong>To: </strong>{request.toDate !== undefined ? (request.toDate[2] + "-" + request.toDate[1] + "-" + request.toDate[0]) : "No Date!"}</p>
                    <p><strong>Reason: </strong>{request.requestReason !== undefined ? (<Badge color='info'>{request.requestReason}</Badge>) : "No Reason!"}</p>
                    <p><strong>Status: </strong>{request.status !== null ? <Badge color={getStatusColor(request.status)}>{request.status}</Badge> : "No Status"}</p>
                    <p><strong>Comment: </strong>{request.comment !== null ? request.comment : "No comment!"}</p>
                    <p><strong>Created: </strong>{request.created !== null ? readableTime(request.created, true) : "No Date!"}</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleMod}>Close</Button>
                </ModalFooter>
            </Modal>
        );
    }else{
        return <div/>
    }
};

export default RequestModal;