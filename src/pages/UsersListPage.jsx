import {useEffect} from "react";
import {Container} from "react-bootstrap";
import UsersTable from "../components/UsersTable.jsx";
import Loader from "../components/Loader.jsx";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import SuccessMessage from "../components/SuccessMessage.jsx";
import UsersFilter from "../components/UsersFilter.jsx";
import AppPagination from "../components/AppPagination.jsx";
import useUsers from "../hooks/useUsers.js";

const UsersListPage = () => {
    const {
        currentUsers,
        loading,
        error,
        setError,
        isDeleted,
        setIsDeleted,
        searchName,
        handleSearchName,
        selectedCity,
        handleFilterCity,
        uniqueCities,
        currentPage,
        setCurrentPage,
        totalItems,
        itemsPerPage,
        showModal,
        userToDelete,
        handleShowDeleteModal,
        handleCloseDeleteModal,
        handleDeleteUser,
        fetchUsers
    } = useUsers();

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

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
                onDelete={handleShowDeleteModal} />
            <AppPagination
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
            <ConfirmDeleteModal
                show={showModal}
                userName={userToDelete?.name}
                handleDelete={() => handleDeleteUser(userToDelete?.id)}
                handleClose={handleCloseDeleteModal}/>
        </Container>
    )
}

export default UsersListPage;