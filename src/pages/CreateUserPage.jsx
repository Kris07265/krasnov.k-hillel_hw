import {useNavigate} from "react-router-dom";
import {createUser} from "../api/usersApi.js";
import {useState} from "react";
import {Container} from "react-bootstrap";
import UserForm from "../components/UserForm.jsx";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import SuccessMessage from "../components/CuccessMessage.jsx";

const CreateUserPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [isCreated, setIsCreated] = useState(null);

    const handleCreate = async (values) => {
        try {
            setLoading(true);
            await createUser(values);
            setError(null);
            setIsCreated("User successfully created!");
            setTimeout(() => {
                navigate('/users');
            }, 2000);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <Loader/>
    }

    return (
        <Container>
            {error ? <ErrorMessage error = {error} onClose={() => setError(null)}/> : null}
            {isCreated ? <SuccessMessage success={isCreated} onClose={() => setIsCreated(null)}/> : null}
            <h1 className="my-4">Create New User</h1>
            <UserForm onSubmit={handleCreate} />
        </Container>
    );
}
export default CreateUserPage;