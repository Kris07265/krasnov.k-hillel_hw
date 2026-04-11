import {Toast, ToastContainer} from "react-bootstrap";
import PropTypes from "prop-types";

const SuccessMessage = ({success, onClose}) => {
    if (!success) return null;
    return (
        <ToastContainer
            position="bottom-end"
            className="p-3"
            style={{position: 'fixed' }}
        >
            <Toast
                show={!!success}
                onClose={onClose}
                bg="success"
                autohide
                delay={5000}
            >
                <Toast.Header closeButton={true}>
                    <strong className="me-auto">Success</strong>
                    <small>Now</small>
                </Toast.Header>
                <Toast.Body className="text-white">
                    {success}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

SuccessMessage.propTypes = {
    success: PropTypes.string,
    onClose: PropTypes.func.isRequired,
};

export default SuccessMessage;