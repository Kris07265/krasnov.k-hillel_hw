import { Alert } from '@mui/material';
import './ErrorMessage.scss';

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

export default ErrorMessage;