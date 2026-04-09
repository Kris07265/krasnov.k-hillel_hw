import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getUserById} from "../api/usersApi.js";
import Loader from "../components/Loader.jsx";
import {Button, Card, Container, ListGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage.jsx";

const UserDetailsPage = () => {
    const {id} = useParams()
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true)
                const user = await getUserById(id);
                setUser(user);
                setError(null);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, [id])

    if (loading) {
        return <Loader/>
    }
    return (
        <Container>
            <div className="mb-3">
                <Button as={Link} to="/users" variant="secondary">
                    ← Back to List
                </Button>
            </div>
        {error ? <ErrorMessage error = {error} onClose={() => setError(null)}/> : null}
        <Card style={{ width: '18rem' }}>
            <Card.Header as="h5">{user.name}</Card.Header>
            <ListGroup variant="flush">
                <ListGroup.Item>Username: {user.username}</ListGroup.Item>
                <ListGroup.Item>Email: {user.email}</ListGroup.Item>
                <ListGroup.Item>Phone: {user.phone}</ListGroup.Item>
                <ListGroup.Item>Website: {user.website}</ListGroup.Item>
                <ListGroup.Item>Company: {user.company?.name}</ListGroup.Item>
                <ListGroup.Item>Address: {user.address?.city}, {user.address?.street}</ListGroup.Item>
            </ListGroup>
        </Card>
        </Container>
    )
}

export default UserDetailsPage;