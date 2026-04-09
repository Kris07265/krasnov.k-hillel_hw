import { Table, Button, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const UsersTable = ({ users, onDelete }) => {
    return (
        <Table striped bordered hover responsive>
            <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Website</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.website}</td>
                    <td>
                        <ButtonGroup size="sm">
                            <Button
                                as={Link}
                                to={`/users/${user.id}`}
                                variant="outline-primary"
                            >
                                View
                            </Button>
                            <Button
                                as={Link}
                                to={`/users/${user.id}/edit`}
                                variant="outline-secondary"
                            >
                                Edit
                            </Button>
                            <Button
                                variant="outline-danger"
                                onClick={() => onDelete(user)}
                            >
                                Delete
                            </Button>
                        </ButtonGroup>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

UsersTable.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            phone: PropTypes.string.isRequired,
            website: PropTypes.string.isRequired,
        })
    ).isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default UsersTable;