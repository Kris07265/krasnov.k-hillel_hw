import {useEffect, useState} from "react";
import {deleteUser, getUsers} from "../api/usersApi.js";
import {Alert, Container, Spinner} from "react-bootstrap";
import UsersTable from "../components/UsersTable.jsx";

const UsersListPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const data = await getUsers();
                setUsers(data);
                setError(null);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
            try {
                setLoading(true);
                await deleteUser(id);
                setUsers(users.filter(user => user.id !== id));
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false);
            }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }
    return (
        <Container>
            <h1>Users Manager</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <UsersTable users={users} onDelete={handleDelete} />
        </Container>
    )
}

export default UsersListPage;