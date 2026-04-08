import {Alert} from "react-bootstrap";

const ErrorMessage = ({error}) => {
    return (
        <Alert variant="danger">{error.message}</Alert>
    )
}

export default ErrorMessage