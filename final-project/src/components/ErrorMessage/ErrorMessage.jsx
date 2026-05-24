import { Alert } from '@mui/material';
import './ErrorMessage.scss';
import PropTypes from "prop-types";

const ErrorMessage = ({ error }) => {
    if (!error) return null;

    return (
        <div className="error-message-wrapper">
            <Alert
                severity="error"
                className="error-message"
            >
                {error}
            </Alert>
        </div>
    );
};

ErrorMessage.propTypes = {
    error: PropTypes.string
};

export default ErrorMessage;