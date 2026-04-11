import { Form, Dropdown } from "react-bootstrap";
import PropTypes from 'prop-types';

const UsersFilter = ({ searchName, selectedCity, handleSearchName, handleFilterCity, cities }) => {
    return (
        <Dropdown className="mb-3">
            <Dropdown.Toggle variant="secondary">Users Filter</Dropdown.Toggle>
            <Dropdown.Menu className="p-3">

                <Form.Group className="mb-2" controlId="searchName">
                    <Form.Label column="sm" className="small">Search by Name</Form.Label>
                    <Form.Control
                        size="sm"
                        type="text"
                        placeholder="Type name..."
                        value={searchName}
                        onChange={(e) => handleSearchName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="filterCity">
                    <Form.Label column="sm" className="small">Filter by City</Form.Label>
                    <Form.Select
                        size="sm"
                        value={selectedCity}
                        onChange={(e) => handleFilterCity(e.target.value)}
                    >
                        <option value="">All Cities</option>
                        {cities.map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

            </Dropdown.Menu>
        </Dropdown>
    );
}

UsersFilter.propTypes = {
    searchName: PropTypes.string.isRequired,
    handleSearchName: PropTypes.func.isRequired,
    selectedCity: PropTypes.string.isRequired,
    handleFilterCity: PropTypes.func.isRequired,
    cities: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default UsersFilter;