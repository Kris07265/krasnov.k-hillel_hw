import {useParams} from "react-router-dom";
import {useEffect} from "react";
import Loader from "../components/Loader.jsx";
import {Button, Card, Col, Container, ListGroup, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage.jsx";
import useUsers from "../hooks/useUsers.js";

const UserDetailsPage = () => {
    const {id} = useParams()
    const {
        user,
        fetchUser,
        loading,
        error,
        setError,
    } = useUsers();

    useEffect(() => {
        fetchUser(id);
    }, [id, fetchUser]);

    if (loading) {
        return <Loader/>
    }
    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <div className="mb-3">
                        <Button as={Link} to="/users" variant="primary" size="sm">
                            ← Back to List
                        </Button>
                    </div>
                    {error ? <ErrorMessage error = {error} onClose={() => setError(null)}/> : null}
                    <Card className="shadow-sm">
                        <Card.Header as="h5" className="text-center">
                            User Profile: {user?.name}
                        </Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <strong>Username:</strong> {user?.username}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Email:</strong> {user?.email}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Phone:</strong> {user?.phone}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Website:</strong> {user?.website}
                            </ListGroup.Item>
                            <ListGroup.Item className="bg-light">
                                <strong>Company:</strong> {user?.company?.name}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Address:</strong>
                                <div className="text-muted small">
                                    {user?.address?.street}, {user?.address?.city}
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                        <Card.Footer className="d-flex justify-content-end">
                            <Button
                                as={Link}
                                to={`/users/${id}/edit`}
                                variant="secondary"
                            >
                                Edit
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default UserDetailsPage;