import { useCallback, useState, useMemo } from "react";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../api/usersApi.js";

const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isCreated, setIsCreated] = useState(null);
    const [isUpdated, setIsUpdated] = useState(null);

    const [userToDelete, setUserToDelete] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isDeleted, setIsDeleted] = useState(null);

    const [searchName, setSearchName] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const fetchUsers = useCallback(async () => {
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
    }, []);

    const fetchUser = useCallback(async (id) => {
        try {
            setLoading(true);
            const data = await getUserById(id);
            setUser(data);
            setError(null);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleDeleteUser = useCallback(async (id) => {
        try {
            setLoading(true);
            await deleteUser(id);
            setUsers(prev => prev.filter(u => u.id !== id));
            setIsDeleted("User successfully deleted!");
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
            setShowModal(false);
        }
    }, []);

    const saveUser = useCallback(async (userData, id = null) => {
        setLoading(true);
        try {
            if (id) {
                await updateUser(id, userData);
                setIsUpdated("User successfully updated!");
            } else {
                await createUser(userData);
                setIsCreated("User successfully created!");
            }
            return true;
        } catch (err) {
            setError(err);
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    const handleShowDeleteModal = useCallback((user) => {
        setUserToDelete(user);
        setShowModal(true);
    }, []);

    const handleCloseDeleteModal = useCallback(() => {
        setShowModal(false);
    }, []);


    const uniqueCities = useMemo(() => {
        return [...new Set(users.map(u => u.address?.city).filter(Boolean))];
    }, [users]);

    const filteredUsers = useMemo(() => {
        return users.filter(u => {
            const matchesName = u.name.toLowerCase().includes(searchName.toLowerCase());
            const matchesCity = selectedCity ? u.address?.city === selectedCity : true;
            return matchesName && matchesCity;
        });
    }, [users, searchName, selectedCity]);

    const currentUsers = useMemo(() => {
        const lastIndex = currentPage * itemsPerPage;
        const firstIndex = lastIndex - itemsPerPage;
        return filteredUsers.slice(firstIndex, lastIndex);
    }, [filteredUsers, currentPage]);

    const handleSearchName = (value) => {
        setSearchName(value);
        setCurrentPage(1);
    };
    const handleFilterCity = (value) => {
        setSelectedCity(value);
        setCurrentPage(1);
    };

    return {
        currentUsers,
        user,
        loading,
        error,
        isCreated,
        isUpdated,
        userToDelete,
        showModal,
        isDeleted,
        searchName,
        selectedCity,
        currentPage,
        totalItems: filteredUsers.length,
        itemsPerPage,
        uniqueCities,

        fetchUsers,
        fetchUser,
        handleDeleteUser,
        saveUser,
        handleShowDeleteModal,
        handleCloseDeleteModal,
        handleSearchName,
        handleFilterCity,
        setCurrentPage,
        setIsDeleted,
        setError,
        setIsCreated,
        setIsUpdated
    };
};

export default useUsers;