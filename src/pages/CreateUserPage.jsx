import {Link, useNavigate} from "react-router-dom";
import {Button, Container} from "react-bootstrap";
import UserForm from "../components/UserForm.jsx";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import SuccessMessage from "../components/SuccessMessage.jsx";
import useUsers from "../hooks/useUsers.js";

const CreateUserPage = () => {
    const navigate = useNavigate();
    const {
        saveUser,
        loading,
        error,
        setError,
        isCreated,
        setIsCreated,
    } = useUsers();

    const handleCreate = async (values) => {
        const savedUser = await saveUser(values);
        if (savedUser) {
            setTimeout(() => {
                navigate('/users');
            }, 2000);
        }
    }

    if (loading) {
        return <Loader/>
    }

    return (
        <Container>
            <div className="mb-3">
                <Button as={Link} to="/users" variant="primary" size="sm">
                    ← Back to List
                </Button>
            </div>
            {error ? <ErrorMessage error = {error} onClose={() => setError(null)}/> : null}
            {isCreated ? <SuccessMessage success={isCreated} onClose={() => setIsCreated(null)}/> : null}
            <h1 className="my-4">Create New User</h1>
            <UserForm onSubmit={handleCreate} />
        </Container>
    );
}
export default CreateUserPage;