import { Alert } from '@mui/material';
import './ErrorMessage.scss';

const ErrorMessage = ({ error }) => {
    if (!error) return null;

    return (
        <Alert
            severity="error"
            className="error-message"
        >
            {error}
        </Alert>
    );
};

export default ErrorMessage;