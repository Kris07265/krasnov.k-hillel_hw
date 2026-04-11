import {Button, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <Container className="mt-5">
            <div className="mb-3">
                <Button as={Link} to="/users" variant="primary" size="sm">
                    ← Back to List
                </Button>
            </div>
            <h1>404</h1>
            <h2>Page Not Found</h2>
        </Container>
    );
};

export default NotFoundPage;