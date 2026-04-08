import {useEffect, useState} from "react";
import {deleteUser, getUsers} from "../api/usersApi.js";
import {Alert, Container} from "react-bootstrap";
import UsersTable from "../components/UsersTable.jsx";
import Loader from "../components/Loader.jsx";

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
            } catch (error) {
                setError(error);
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
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false);
            }
    };

    if (loading) {
        return <Loader/>;
    }
    return (
        <Container>
            <h1>Users Manager</h1>
            {error && <ErrorMessage error = {error}/>}
            <UsersTable users={users} onDelete={handleDelete} />
        </Container>
    )
}

export default UsersListPage;