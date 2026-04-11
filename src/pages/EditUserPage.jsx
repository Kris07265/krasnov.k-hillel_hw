import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import Loader from "../components/Loader.jsx";
import {Button, Container} from "react-bootstrap";
import UserForm from "../components/UserForm.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import SuccessMessage from "../components/SuccessMessage.jsx";
import useUsers from "../hooks/useUsers.js";

const EditUserPage = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const {
        user,
        fetchUser,
        saveUser,
        loading,
        error,
        setError,
        isUpdated,
        setIsUpdated
    } = useUsers();

    useEffect(() => {
        fetchUser(id);
    }, [id, fetchUser]);

    const formatData = (userData) => {
        if (!userData) return null;
        return {
            name: userData.name || '',
            username: userData.username || '',
            email: userData.email || '',
            phone: userData.phone || '',
            website: userData.website || '',
            city: userData.address?.city || '',
            street: userData.address?.street || '',
            companyName: userData.company?.name || '',
        };
    };

    const handleUpdate = async (values) => {
        const success = await saveUser(values, id);
        if (success) {
            setTimeout(() => {
                navigate('/users');
            }, 2000);
        }
    }

    if (loading) return <Loader />;

    return (
        <Container>
            <div className="mb-3">
                <Button as={Link} to="/users" variant="primary" size="sm">
                    ← Back to List
                </Button>
            </div>
            {error ? <ErrorMessage error = {error} onClose={() => setError(null)}/> : null}
            {isUpdated ? <SuccessMessage success={isUpdated} onClose={() => setIsUpdated(null)}/> : null}
            <h1 className="my-4">Edit User {user?.name || ''}</h1>
            {user ? (
                <UserForm
                    initialData={formatData(user)}
                    onSubmit={handleUpdate}
                />
            ) : null}
        </Container>
    );
}
export default EditUserPage;