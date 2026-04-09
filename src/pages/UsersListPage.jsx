import {useEffect, useState} from "react";
import {deleteUser, getUsers} from "../api/usersApi.js";
import {Container} from "react-bootstrap";
import UsersTable from "../components/UsersTable.jsx";
import Loader from "../components/Loader.jsx";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import SuccessMessage from "../components/CuccessMessage.jsx";

const UsersListPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isDeleted, setIsDeleted] = useState(null);

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
                setIsDeleted("User successfully deleted!")
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false);
                setShowModal(false);
            }
    };

    const handleShowModal = (user) => {
        setUserToDelete(user);
        setShowModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowModal(false);
    }

    if (loading) {
        return <Loader/>;
    }
    return (
        <Container>
            <h1>Users Manager</h1>
            {error ? <ErrorMessage error={error} onClose={() => setError(null)} /> : null}
            {isDeleted ? <SuccessMessage success={isDeleted} onClose={() => setIsDeleted(null)}/> : null}
            <UsersTable
                users={users}
                onDelete={handleShowModal} />
            <ConfirmDeleteModal
                show={showModal}
                userName={userToDelete?.name}
                handleDelete={() => handleDelete(userToDelete?.id)}
                handleClose={handleCloseDeleteModal}/>
        </Container>
    )
}

export default UsersListPage;