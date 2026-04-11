import {Toast, ToastContainer} from "react-bootstrap";
import PropTypes from "prop-types";

const ErrorMessage = ({error, onClose}) => {
    if (!error) return null;
    return (
        <ToastContainer
            position="bottom-end"
            className="p-3"
            style={{position: 'fixed' }}
        >
            <Toast
                show={!!error}
                onClose={onClose}
                bg="danger"
                autohide
                delay={5000}
            >
                <Toast.Header closeButton={true}>
                    <strong className="me-auto">System Error</strong>
                    <small>Now</small>
                </Toast.Header>
                <Toast.Body className="text-white">
                    {error.message}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

ErrorMessage.propTypes = {
    error: PropTypes.shape({
        message: PropTypes.string,
    }),
    onClose: PropTypes.func.isRequired,
};

export default ErrorMessage