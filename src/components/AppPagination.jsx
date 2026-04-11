import { Pagination } from 'react-bootstrap';
import PropTypes from 'prop-types';

const AppPagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const pageCount = Math.ceil(totalItems / itemsPerPage);
    if (pageCount <= 1) return null;
    let items = [];
    for (let number = 1; number <= pageCount; number++) {
        items.push(
            <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => onPageChange(number)}
            >
                {number}
            </Pagination.Item>
        );
    }

    return (
        <div className="d-flex justify-content-center mt-4">
            <Pagination size="sm">
                <Pagination.Prev
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                />
                {items}
                <Pagination.Next
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === pageCount}
                />
            </Pagination>
        </div>
    );
};

AppPagination.propTypes = {
    totalItems: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default AppPagination;