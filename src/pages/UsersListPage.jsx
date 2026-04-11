import {useEffect, useState} from "react";
import {deleteUser, getUsers} from "../api/usersApi.js";
import {Container} from "react-bootstrap";
import UsersTable from "../components/UsersTable.jsx";
import Loader from "../components/Loader.jsx";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import SuccessMessage from "../components/SuccessMessage.jsx";
import UsersFilter from "../components/UsersFilter.jsx";
import AppPagination from "../components/AppPagination.jsx";

const UsersListPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isDeleted, setIsDeleted] = useState(null);
    const [searchName, setSearchName] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

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

    const handleSearchName = (value) => {
        setSearchName(value);
        setCurrentPage(1);
    };

    const handleFilterCity = (value) => {
        setSelectedCity(value);
        setCurrentPage(1);
    };
    const uniqueCities = [...new Set(users.map(u => u.address?.city).filter(Boolean))];
    const filteredUsers = users.filter(user => {
        const matchesName = user.name
            .toLowerCase()
            .includes(searchName.toLowerCase());
        const matchesCity = selectedCity === "" || user.address?.city === selectedCity;
        return matchesName && matchesCity;
    });

    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    if (loading) {
        return <Loader/>;
    }
    return (
        <Container>
            <h1>Users Manager</h1>
            {error ? <ErrorMessage error={error} onClose={() => setError(null)} /> : null}
            {isDeleted ? <SuccessMessage success={isDeleted} onClose={() => setIsDeleted(null)}/> : null}
            <UsersFilter
            searchName={searchName}
            selectedCity={selectedCity}
            handleSearchName={handleSearchName}
            handleFilterCity={handleFilterCity}
            cities={uniqueCities}/>
            <UsersTable
                users={currentUsers}
                onDelete={handleShowModal} />
            <AppPagination
                totalItems={filteredUsers.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
            <ConfirmDeleteModal
                show={showModal}
                userName={userToDelete?.name}
                handleDelete={() => handleDelete(userToDelete?.id)}
                handleClose={handleCloseDeleteModal}/>
        </Container>
    )
}

export default UsersListPage;