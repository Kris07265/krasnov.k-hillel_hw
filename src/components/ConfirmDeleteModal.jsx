import {Modal, Button} from "react-bootstrap";
import PropTypes from "prop-types";

const ConfirmDeleteModal = ({show, handleClose, handleDelete, userName}) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete the user {userName}?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

ConfirmDeleteModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    userName: PropTypes.string,
};

export default ConfirmDeleteModal;