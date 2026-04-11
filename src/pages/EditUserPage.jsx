import {Link, useNavigate, useParams} from "react-router-dom";
import {getUserById, updateUser} from "../api/usersApi.js";
import {useEffect, useState} from "react";
import Loader from "../components/Loader.jsx";
import {Button, Container} from "react-bootstrap";
import UserForm from "../components/UserForm.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import SuccessMessage from "../components/SuccessMessage.jsx";

const EditUserPage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [isUpdated, setIsUpdated] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
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
        try {
            setLoading(true);
            await updateUser(id, values);
            setError(null);
            setIsUpdated("User successfully updated!");
            setTimeout(() => {
                navigate('/users');
            }, 2000);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
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