import { Table, Button, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const UsersTable = ({ users, onDelete }) => {
    return (
        <Table striped bordered hover responsive="md">
            <thead>
            <tr>
                <th>Name</th>
                <th className="d-none d-sm-table-cell">Email</th>
                <th className="d-none d-md-table-cell">Phone</th>
                <th className="d-none d-lg-table-cell">Website</th>
                <th className="text-center">Actions</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td className="d-none d-sm-table-cell">{user.email}</td>
                    <td className="d-none d-md-table-cell">{user.phone}</td>
                    <td className="d-none d-lg-table-cell">{user.website}</td>
                    <td className="text-center">
                        <ButtonGroup size="sm">
                            <Button
                                as={Link}
                                to={`/users/${user.id}`}
                                variant="outline-primary"
                                title="View details"
                            >
                                <i className="bi bi-eye"></i>
                            </Button>
                            <Button
                                as={Link}
                                to={`/users/${user.id}/edit`}
                                variant="outline-secondary"
                                title="Edit user"
                            >
                                <i className="bi bi-pencil"></i>
                            </Button>
                            <Button
                                variant="outline-danger"
                                onClick={() => onDelete(user)}
                                title="Delete user"
                            >
                                <i className="bi bi-trash"></i>
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
            id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            name: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            phone: PropTypes.string.isRequired,
            website: PropTypes.string.isRequired,
        })
    ).isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default UsersTable;